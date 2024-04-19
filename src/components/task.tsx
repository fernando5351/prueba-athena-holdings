import api from '@/api';
import { ITask } from '@/interface/task';
import React from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

const Task = ({ item }: { item: ITask }) => {

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

    const statusClasses = {
      todo: 'btn-warning',
      doing: 'btn-info',
      done: 'btn-success'
    };  

    const statusNames = {
      todo: 'Por hacer',
      doing: 'En progreso',
      done: 'Completado'
    };
    
    return (
      <div className="card shadow m-2" style={{ width: '100%' }}>
        <div className="card-header text-break">{item.name}</div>
        <div className="card-body">
          <div className="d-flex flex-row flex-aling-center mb-3">
            <p className="fw-bold">Descripción:</p>
            <p className="ms-1 text-break card-text fst-italic text-decoration-underline text-center m-0">{item.description}</p>
          </div>
          <div className="d-flex flex-row flex-aling-center mb-3">
            <p className="fw-bold">Fecha a finalizar:</p>
            <p className="ms-1 text-break card-text fst-italic text-decoration-underline">{new Date(item.dueDate).toISOString().split('T')[0]}</p>
          </div>
          <div className="d-flex flex-row flex-aling-center mb-3">
            <p className="fw-bold">Estado:</p>
            <p style={{cursor:'unset'}} className={`btn ${statusClasses[item.status]} m-1 text-center m-0`}>{statusNames[item.status]}</p>
          </div>
          <div className="mt-auto">
            <div className="d-flex justify-content-end">
              <Link href={`/task/update/${item.id}`} className="btn btn-primary m-2">
                Actualizar
              </Link>
              <a onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onDelete(item.id)} className="btn btn-danger m-2">Eliminar</a>
            </div>
          </div>
        </div>
      </div>

    );
}

export default Task;