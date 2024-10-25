import { useEffect, useState } from "react";
import PostForm from "./PostForm"; // Asegúrate de que esta ruta sea correcta para tu proyecto
import PostList from "./PostList"; // Asegúrate de que esta ruta sea correcta también

export default function Profile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored User ID:", storedUserId); // Verificar si el ID está disponible
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  
  const addPost = (newPost: string) => {
    setPosts([newPost, ...posts]); // Agrega el nuevo post al estado
  };

  if (!userId) {
    return <p>Cargando...</p>; // Puedes poner un loader aquí si prefieres
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8">
      <div className="title mb-8">
        <h1 className="text-4xl font-bold text-foreground">Mi Perfil</h1>
        <p className="text-xl text-foreground">¡Bienvenido a tu perfil!</p>
      </div>

      {/* Formulario para publicar */}
      <PostForm addPost={addPost} userId={userId} /> {/* Asegúrate de pasar userId */}

      {/* Lista de publicaciones */}
      <PostList posts={posts} />
    </div>
  );
}
