/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import api from '@/api';
import Loader from '@/components/loader';

const Update = ({params}: {params: { id: number }}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${api.api_url}/items/${params.id}`, {
        headers: { 'x-api-key': api.api_key }
      });
      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
        showError(errorData.message || 'Hubo un problema al procesar la solicitud');
      }
      const responseData = await response.json();
      setDescription(responseData.description);
      setName(responseData.name);
      setStatus(responseData.status);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showError(error.message || 'Hubo un problema al obtener la tarea');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formattedDueDate = format(date, 'yyyy-MM-dd');      
      const data = JSON.stringify({ name, description, status, dueDate: formattedDueDate });
      const response = await fetch(`${api.api_url}/items/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-api-key': api.api_key },
        body: data
      });
      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
        showError(errorData.message || 'Hubo un problema al procesar la solicitud');
      }
      const responseData = await response.json();
      handleSuccess(responseData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showError(error.message || 'Hubo un problema al procesar la solicitud');
    }
  };

  const handleSuccess = (data: any) => {
    Swal.fire({
      title: `Tarea ${data.name} actualizada`,
      icon: 'success',
      timer: 3000,
      position: 'top-end',
      toast: true
    })
    window.location.href = '/';
  };

  const showError = (message: string) => {
    Swal.fire({
      title: 'Error',
      text: message,
      timer: 3000,
      icon: 'error'
    });
  };

  const validateForm = (): boolean => {
    return name.trim() !== '' && description.trim() !== '' && status.trim() !== '' && date !== null;
  };

  const minDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="container shadow mt-5">
      { isLoading && <Loader />}
      <div className="row justify-content-center">
        <div className="col text-center  m-2">
          <h1 className='fw-bold'>Actualizar Tarea</h1>
        </div>
      </div>
      <div className="row">
        <div className="col md-12">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input className="form-control" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <input className="form-control" type="text" value={description} onChange={(event) => setDescription(event.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select className="form-control" value={status} onChange={(event) => setStatus(event.target.value)} required>
                  <option disabled value="">Seleccionar</option>
                  <option value="todo">Por hacer</option>
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
                  value={date ? date.toISOString().split('T')[0] : ''} 
                  onChange={(event) => {
                    const selectedDate = event.target.value; 
                    if (selectedDate !== date.toISOString().split('T')[0]) {
                      setDate(new Date(selectedDate));
                    }
                  }}
                  required
                  min={minDate}
                />
              </div>
            </div>
            <div className="modal-footer">
              <a href='/' className="btn btn-secondary m-2">Cancelar</a>
              <button type="submit" className="btn btn-primary m-2" disabled={!validateForm()}>Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
