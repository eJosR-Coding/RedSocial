"use client";

import { useEffect, useState } from "react";

// Definir el tipo `Room`
type Room = {
  _id: string;       // ID generado por MongoDB
  status: string;    // Estado de la room (por ejemplo, "waiting")
};

export default function Home() {
  // Usamos el tipo `Room` para la variable de estado
  const [room, setRoom] = useState<Room | null>(null); // Puede ser `Room` o `null` inicialmente

  useEffect(() => {
    fetch("/api/rooms") // 1. Hacemos la solicitud GET a /api/rooms
      .then((response) => response.json())
      .then((rooms: Room[]) => {  // Declaramos que `rooms` es un array de `Room`
        if (rooms.length > 0) {
          // Si ya hay rooms, se debería conectar a una
          setRoom(rooms[0]); // Guardamos la primera room encontrada en el estado
        } else {
          // Si no hay rooms, hacemos una solicitud POST para crear una nueva
          fetch("/api/rooms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "New Room",
              description: "A new room"
            }),
          })
            .then((response) => response.json())
            .then((room: Room) => {  // Declaramos que el `room` devuelto es de tipo `Room`
              setRoom(room); // Guardamos la room recién creada en el estado
              console.log(room); // Mostramos la room recién creada
            });
        }
      });

  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="title">
        <h1>Pelu.tv</h1>
        <h2>Coming soon</h2>
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            {/* Mostrar el ID o nombre de la room si existe */}
            {room ? `Conectado a la room: ${room.data._id}` : "Cargando..."}
            {/**Hay que cambiar la cuestion de que en cada post, está creando nuevas salas y agregando en la DB, o sea está bien pero por ahora para 
       * el pre test, esta mal porque se crean muchas colecciones
       */}
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            target="_blank"
          >
            Inscribete
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a href="">
          Copyright by Pelucorp.org
        </a>
      </footer>
    </div>
  );

}


