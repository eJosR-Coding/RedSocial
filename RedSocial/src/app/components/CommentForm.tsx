"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface CommentFormProps {
  postId: string;
  userId: string;
  addComment: (comment: string) => void;
}

export default function CommentForm({ postId, userId, addComment }: CommentFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId,
          body: comment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        addComment(comment);
        setComment(""); // Limpiar el campo
      } else {
        console.error("Error al publicar comentario:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribe un comentario..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={2}
        sx={{
          backgroundColor: "#1f2937",
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: "0.5rem" }}
        onClick={handleSubmit}
      >
        Comentar
      </Button>
    </Box>
  );
}
