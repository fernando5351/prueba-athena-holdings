/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Task from '@/components/task';
import { useState, useEffect } from 'react';
import { ITask } from '@/interface/task';
import api from '@/api';
import Loader from '@/components/loader';
import Swal from 'sweetalert2';

export default function Home() {
  const [items, setItems] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"todo" | "doing" | "done" | "">("");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        showError(err);
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as "todo" | "doing" | "done" | "");
  };

  const clearFilter = () => {
    setFilter("");
  };

  const filteredItems = filter ? items.filter(item => item.status === filter) : items;

  return (
    <main className="container flex min-h-screen flex-col m-6 items-center justify-center aling-center p-24 mt-4">
      { isLoading && <Loader /> }
      <div className="row justify-content-center">
        <div className="m-3 col-12 col-lg-6 d-flex justify-content-center">
          <a href='/task/create' className="btn btn-primary">
            Crear nueva tarea
          </a>
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="filterSelect">Filtrar</label>
            <select className="form-select" id="filterSelect" value={filter} onChange={handleFilterChange}>
              <option value="">Todos</option>
              <option value="todo">Por hacer</option>
              <option value="doing">En proceso</option>
              <option value="done">Completadas</option>
            </select>
            {filter && (
              <button className="btn btn-outline-danger" onClick={clearFilter}>Limpiar</button>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-12 d-flex flex-wrap"> 
          {filteredItems.map((item) => (
            <div className="col-12 col-md-6 col-lg-5 m-2" key={item.id}>
              <Task item={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
