"use client"
import Task from '@/components/task';
import { useState, useEffect } from 'react'
import { ITask } from '@/interface/task';
import api from '@/api';

export default function Home() {

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

  return (
    <main className="container flex min-h-screen flex-col m-6 items-center justify-center aling-center p-24 mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          <a href='/task/create' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Crear nueva tarea
          </a>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-12 d-flex flex-wrap justify-content-center">
          {items.map((item) => (
            <div className="col-12 col-md-6 col-lg-5 m-4" key={item.id}>
              <Task item={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
