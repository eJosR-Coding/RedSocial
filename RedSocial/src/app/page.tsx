"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 13 usa `next/navigation` para redirigir

// Definir el tipo `Post`
type Post = {
  _id: string;       // ID generado por MongoDB
  title: string;     // Título de la publicación
  body: string;      // Contenido de la publicación
};

export default function Home() {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter(); // Para redirigir al login o registro

  useEffect(() => {
    fetch("/api/posts") // Hacemos la solicitud GET a /api/posts
      .then((response) => response.json())
      .then((posts: Post[]) => {
        if (posts.length > 0) {
          setPost(posts[0]); // Guardamos la primera publicación encontrada en el estado
        } else {
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "Nuevo Título",
              body: "Este es el contenido de la publicación",
            }),
          })
            .then((response) => response.json())
            .then((newPost: Post) => {
              setPost(newPost);
              console.log(newPost);
            });
        }
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="title">
        <h1>MiRedSocial</h1>
        <h2>Publicaciones recientes</h2>
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            {post ? `Conectado a la publicación: ${post.title}` : "Cargando..."}
          </li>
          <li>Guarda y revisa tus cambios instantáneamente.</li>
        </ol>

        {/* Enlaces para el registro y login */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => router.push('/auth/register')} // Redirigir al registro
          >
            Registrarse
          </button>

          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => router.push('/auth/login')} // Redirigir al login
          >
            Iniciar Sesión
          </button>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a href="https://pelucorp.org">
          Copyright by Pelucorp.org
        </a>
      </footer>
    </div>
  );
}
