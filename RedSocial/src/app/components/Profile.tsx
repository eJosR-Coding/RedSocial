import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PostForm from "./PostForm";
import PostList from "./PostList";

interface IUser {
  username: string;
  email: string;
}

interface Post {
  title: string;
  body: string;
  createdAt: string;
}

export default function Profile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const res = await fetch(`/api/users?userId=${userId}`);
      const data = await res.json();

      if (data.success) {
        setUserData(data.data);
      } else {
        setError(data.message || "Error al obtener los datos del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setError("Error al conectarse con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]); // Agrega el nuevo post al estado
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No se encontraron datos del usuario.</p>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh", // Ocupa toda la pantalla
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1f2937",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "2rem",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {userData.username}
        </Typography>
        <Typography variant="body1" sx={{ color: "#9CA3AF" }}>
          {userData.email}
        </Typography>
      </Box>

      {/* Formulario para publicar */}
      <PostForm addPost={addPost} userId={userId || ""} />

      {/* Lista de publicaciones */}
      <PostList posts={posts} />
    </Box>
  );
}
