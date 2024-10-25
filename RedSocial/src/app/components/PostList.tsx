"use client";

import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Post } from "./PostForm";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <Box sx={{ width: "100%", padding: "2rem" }}>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#1f2937",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              color: "white",
            }}
          >
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              {post.body}
            </Typography>
            <Typography variant="caption" sx={{ marginTop: "1rem", display: "block", color: "#9CA3AF" }}>
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
            <IconButton sx={{ color: "#3b82f6" }}>
              <ThumbUpIcon />
            </IconButton>
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
