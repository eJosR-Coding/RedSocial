import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface CommentFormProps {
    postId: string;
    userId: string;
    addComment: (comment: IComment) => void;
    parentCommentId?: string;
}

export interface IComment {
    _id: string;
    body: string;
    user: { username: string };
    createdAt: string;
}

export default function CommentForm({ postId, userId, addComment, parentCommentId }: CommentFormProps) {
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!comment) return;

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, userId, body: comment, parentCommentId }),
            });

            const data = await res.json();
            if (data.success) {
                addComment(data.data);
                setComment("");
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
                sx={{ backgroundColor: "#1f2937", color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" } }}
            />
            <Button fullWidth variant="contained" color="primary" sx={{ marginTop: "0.5rem" }} onClick={handleSubmit}>
                Comentar
            </Button>
        </Box>
    );
}
