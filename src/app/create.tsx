"use client"
import { useState, useEffect } from 'react'
import api from '@/api';
import Swal from 'sweetalert2';

export default function Login () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
    console.log({ title, description, status, dueDate });
  };

    return (
        <div className="container">
            <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Titulo</label>
                        <input className="form-control" type="text" id="formFile" value={title} onChange={(event)=>
                        setTitle(event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Descripcion</label>
                        <input className="form-control" type="text" id="formFileMultiple" value={description} onChange={(event)=>
                        setDescription(event.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Estado</label>
                        <select className="form-control" name="status" id="status" value={status} onChange={(event)=>
                          setStatus(event.target.value)}
                        >
                          <option disabled selected value="">Seleccionar</option>
                          <option value="todo">Todo</option>
                          <option value="doing">En Progreso</option>
                          <option value="done">Terminado</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Fecha a finalizar</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="date" value={dueDate} onChange={(event)=>
                        setDueDate(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary m-2" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary m-2">
                        Save changes
                      </button>
                    </div>
                  </form>
        </div>
    );
}
