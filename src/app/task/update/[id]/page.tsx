"use client"
import { useState } from 'react'
import api from '@/api';
import Swal from 'sweetalert2';

export default function Update ({params}: {params: { id: number }}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const formattedDueDate = dueDate.toString().split('T')[0];
      const data = JSON.stringify({ name, description, status, dueDate: formattedDueDate });
    
      const options = {
        method: 'PUT',
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
          handleSuccess(responseData);
          break;
        case 401:
          showError('No está autenticado');
          break;
        case 404:
          showError('Tarea no encontrada');
          break;
        case 422:
          const errorData = await response.json();
          errorData.errors.forEach((error: any) => showError(error.msg, false));
          break;
        default:
          showError('Hubo un problema al procesar la solicitud');
          break;
      }
    } catch (error) {
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
  
  const showError = (message: string, timer: boolean = true) => {
    Swal.fire({
      title: 'Error',
      text: message,
      timer: timer ? 2000 : undefined,
      icon: 'error'
    });
  };
  

  function validateForm(): boolean {
    return name !== '' && description !== '' && status !== '' && dueDate !== '';
  }

  return (
    <div className="container shadow mt-5">
      <div className="row justify-content-center">
        <div className="col text-center">
          <h1 className='fw-bold'>Crear nueva Tarea {params.id}</h1>
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
                  <option disabled selected value="">Seleccionar</option>
                  <option value="todo">Todo</option>
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
                    onChange={(event) => setDueDate(event.target.value)} 
                    required
                    min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="modal-footer">
              <a href='/' className="btn btn-secondary m-2" data-bs-dismiss="modal">
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
