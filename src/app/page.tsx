"use client"
import Image from 'next/image';
import Task from '@/components/task';
import { useState, useEffect } from 'react'
import { ITask } from '@/interface/task';
import api from '@/api';
import Swal from 'sweetalert2';

export default function Home() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<ITask[]>([]);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': api.api_key
      }
    };

    fetch(`${api.api_url}/items`, options)
    .then(response => response.json())
    .then(response => {
        setItems(response);
      })
    .catch(err => console.error(err));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
    console.log({ title, description, status, dueDate });
  };

  return (
    <main className="container flex min-h-screen flex-col m-4 items-center justify-between p-24">
      <div className="row justify-content-center">
        <div className="col-12 m-2">
          <div className="col-6 justify-content-center">
          <button type="button" tabIndex={-1} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Crear nueva tarea
          </button>

          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
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
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="col-12 d-flex flex-row bd-highlight mb-3">
            {items.map((item) => (
              <div className="col-6" key={item.id}>
                <Task item={item} />
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
