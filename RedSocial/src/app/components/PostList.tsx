// PostList.tsx
import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Post, Comment } from "../types"; // Adjust the path as needed

interface PostListProps {
  posts: Post[];
  userId: string;
}

export default function PostList({ posts, userId }: PostListProps) {
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});

  const addCommentToPost = (postId: string, newComment: Comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), newComment],
    }));
  };

  return (
    <Box sx={{ width: "100%", padding: "2rem" }}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Box
            key={post._id}
            sx={{
              backgroundColor: "#1f2937",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {post.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              {post.body}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
            <IconButton color="primary">
              <ThumbUpIcon />
            </IconButton>

            {/* Formulario para agregar un comentario */}
            <CommentForm
              postId={post._id}
              userId={userId}
              addComment={(newComment) => addCommentToPost(post._id, newComment)}
            />

            {/* Lista de comentarios */}
            <CommentList
              comments={comments[post._id] || []}
              postId={post._id}
              userId={userId}
              addComment={(newComment) => addCommentToPost(post._id, newComment)}
            />
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="white">
          Aún no has publicado nada.
        </Typography>
      )}
    </Box>
  );
}
