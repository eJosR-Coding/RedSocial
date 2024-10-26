import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { IComment } from "./CommentForm";

interface CommentListProps {
  comments: IComment[];
  postId: string;
  userId: string;
  addComment: (newComment: IComment) => void;
}

export default function CommentList({ comments, postId, userId, addComment }: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const addReply = (newComment: IComment) => {
    setReplyingTo(null);
    addComment(newComment);
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      {comments.map((comment) => (
        <Box
          key={comment._id}
          sx={{
            backgroundColor: "#2d3748",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="body1">{comment.body}</Typography>
          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            {comment.user.username} - {new Date(comment.createdAt).toLocaleString()}
          </Typography>
          <Button onClick={() => setReplyingTo(comment._id)} sx={{ color: "#3b82f6" }}>
            Responder
          </Button>
          {replyingTo === comment._id && (
            <CommentForm postId={postId} userId={userId} addComment={addReply} parentCommentId={comment._id} />
          )}
        </Box>
      ))}
    </Box>
  );
}
