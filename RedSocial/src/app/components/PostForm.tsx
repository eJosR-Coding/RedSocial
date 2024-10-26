// PostForm.tsx
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface PostFormProps {
  addPost: (newPost: Post) => void;
  userId: string;
}

export interface Post {
  _id: string; // Agrega esta propiedad
  title: string;
  body: string;
  createdAt: string;
  user: string;
}

export default function PostForm({ addPost, userId }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handlePost = async () => {
    if (!title || !postContent) return;

    const newPost: Post = {
      _id: Date.now().toString(), // Genera un ID temporal
      title,
      body: postContent,
      createdAt: new Date().toISOString(),
      user: userId,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          userId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        addPost(data.data);
        setTitle("");
        setPostContent("");
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
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribe el título aquí..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          marginBottom: "1rem",
          "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
        }}
      />
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
