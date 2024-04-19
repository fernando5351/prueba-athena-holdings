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

    const onUpdate = (id: number) => {
        
    }

    return (
      <div className="card shadow m-2" style={{ width: '100%' }}>
        <div className="card-header">{item.name}</div>
        <div className="card-body">
          <h5 className="card-title">{item.description}</h5>
          <p className="card-text">{item.dueDate.toString()}</p>
          <div className="d-flex">
          <Link href={`/task/update/${item.id}`} className="btn btn-primary m-2">
            Actualizar Elemento
          </Link>
          <Link href={`/task/update/${item.id}`}>
            Actualizar
          </Link>
            <a onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onDelete(item.id)} className="btn btn-danger m-2">Eliminar</a>
          </div>
        </div>
      </div>
    );
}

export default Task;