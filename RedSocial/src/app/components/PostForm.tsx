"use client"; 

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface PostFormProps {
  addPost: (newPost: Post) => void;
  userId: string;
}

export interface Post {
  title: string;
  body: string;
  createdAt: string;
}

export default function PostForm({ addPost, userId }: PostFormProps) {
  const [postContent, setPostContent] = useState("");  // Estado para el contenido
  const [postTitle, setPostTitle] = useState("");      // Estado para el título

  const handlePost = async () => {
    if (!postContent || !postTitle) return; // Asegurarse de que el título y el contenido no estén vacíos

    const newPost: Post = {
      title: postTitle, // Título ingresado por el usuario
      body: postContent,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPost.title,   // Incluye el título
          body: newPost.body,
          userId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        addPost(newPost);
        setPostTitle("");      // Limpiar el campo de título
        setPostContent("");    // Limpiar el campo de contenido
      } else {
        console.error("Error al publicar:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "960px",
        backgroundColor: "#1f2937",
        padding: "2rem",
        borderRadius: "8px",
        marginBottom: "2rem",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" color="white" sx={{ marginBottom: "1rem" }}>
        ¿Qué estás pensando?
      </Typography>

      {/* Campo para el título del post */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribe el título aquí..."
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        InputLabelProps={{ style: { color: "#fff" } }}
        sx={{
          "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
          marginBottom: "1rem",
        }}
      />

      {/* Campo para el contenido del post */}
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        placeholder="Escribe tu publicación aquí..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        InputLabelProps={{ style: { color: "#fff" } }}
        sx={{
          "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          marginTop: "1rem",
          backgroundColor: "#3b82f6",
          "&:hover": { backgroundColor: "#2563eb" },
        }}
        onClick={handlePost}
      >
        Publicar
      </Button>
    </Box>
  );
}
