import api from '@/api';
import { ITask } from '@/interface/task';
import React from 'react';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

const Task = ({ item }: { item: ITask }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');

    const onDelete = (id: number) => {
        Swal.fire({
            title: 'Estas seguro de eliminar este registro?',
            text: 'No podras revertir esto',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                
                const options = {
                    method: 'DELETE',
                    headers: {
                      'x-api-key': api.api_key
                    }
                  };
                fetch(`${api.api_url}/items/${id}`, options)
                .then(response => {
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'Registro eliminado exitosamente',
                        icon: 'success',
                        timer: 2000
                    }).then(r => {
                        window.location.reload()
                    });
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error',
                        text: err,
                        icon: 'error',
                        timer: 3000
                    });
                });
            } else {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'Tu registro esta a salvo',
                    icon: 'info',
                    timer: 2000
                });
            }
        });
    }

    const onUpdate = (id: number) => {
        Swal.fire({
            title: 'Editar' + item.name,
            html: `
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
                `
        })
    }

    return (
        <div className="card m-2">
             <div className="card-header">
                {item.name}
            </div>
            <div className="card-body">
                <h5 className="card-title">{item.description}</h5>
                <p className="card-text">{item.dueDate.toString()}</p>
                <a href="#" onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onUpdate(item.id)} className="btn btn-primary">Editar</a>
                <a href="#" onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onDelete(item.id)} className="btn btn-danger">Eliminar</a>
            </div>
        </div>
    );
}

export default Task;