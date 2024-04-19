"use client"
import { useState } from 'react'
import api from '@/api';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Loader from '@/components/loader';

export default function Create () {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      
      const formattedDueDate = dueDate.toString().split('T')[0];
      const data = JSON.stringify({ name, description, status, dueDate: formattedDueDate });
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': api.api_key
        },
        body: data
      };
      
      const response = await fetch(`${api.api_url}/items`, options);
  
      switch (response.status) {
        case 200:
          const responseData = await response.json();
          setIsLoading(false);
          handleSuccess(responseData);
          break;
        case 401:
          setIsLoading(false);
          showError('No está autenticado');
          break;
        case 422:
          const errorData = await response.json();
          setIsLoading(false);
          errorData.errors.forEach((error: any) => showError(error.msg));
          break;
        default:
          setIsLoading(false);
          showError('Hubo un problema al procesar la solicitud');
          break;
      }
    } catch (error) {
      setIsLoading(false);
      showError('Hubo un problema de red');
    }
  };
  
  const handleSuccess = (data: any) => {
    Swal.fire({
      title: `Tarea ${data.name} creada`,
      icon: 'success',
      timer: 2000,
      position: 'top-end',
      toast: true
    }).then((result) => {
      if (result) {
        window.location.href = '/';
      }
    });
  };
  
  const showError = (message: string) => {
    Swal.fire({
      title: 'Error',
      text: message,
      timer: 3000,
      icon: 'error'
    });
  };
  

  function validateForm(): boolean {
    return name !== '' && description !== '' && status !== '' && dueDate !== '';
  }

  const minDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="container shadow mt-3">
      { isLoading && <Loader />}
      <div className="row justify-content-center">
        <div className="col text-center m-4">
          <h1 className='fw-bold'>Crear nueva Tarea</h1>
        </div>
      </div>
      <div className="row">
        <div className="col md-12">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input className="form-control" type="text" id="formFile" value={name} onChange={(event)=>
                setName(event.target.value)} required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <input className="form-control" type="text" id="formFileMultiple" value={description} onChange={(event)=>
                setDescription(event.target.value)} required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select className="form-control" name="status" id="status" value={status} onChange={(event)=>
                  setStatus(event.target.value)} required
                  >
                  <option disabled value="">Seleccionar</option>
                  <option value="todo">por hacer</option>
                  <option value="doing">En Progreso</option>
                  <option value="done">Terminado</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha a finalizar</label>
                <input 
                  className="form-control" 
                  id="formFileSm" 
                  type="date" 
                  value={dueDate} 
                  onChange={(event) => {
                    const selectedDate = event.target.value; 
                    setDueDate(selectedDate);
                  }}
                  required
                  min={minDate}
                />
              </div>
            </div>
            <div className="modal-footer">
              <a href='/' className="btn btn-secondary m-2">
                Cancelar
              </a>
              <button type="submit" className="btn btn-primary m-2" disabled={!validateForm()}>
                Agregar Tarea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
