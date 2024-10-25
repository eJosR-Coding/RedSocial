"use client";

import { useState } from "react";

interface PostFormProps {
    addPost: (newPost: string) => void;
    userId: string; // Asegúrate de pasar el `userId` desde el componente que renderiza el formulario
}

export default function PostForm({ addPost, userId }: PostFormProps) {
    const [postContent, setPostContent] = useState("");

    const handlePost = async () => {
        if (!postContent) return;

        console.log("Enviando post:", {
            title: "Nuevo Post",
            body: postContent,
            userId,
        });

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "Nuevo Post",
                    body: postContent,
                    userId,
                }),
            });

            const data = await res.json();
            console.log("Respuesta de la API:", data);

            if (data.success) {
                addPost(postContent);
                setPostContent("");
            } else {
                console.error("Error al publicar:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-full max-w-xl mb-8">
            <textarea
                className="w-full border p-2 rounded-md bg-background text-foreground"
                placeholder="¿Qué estás pensando?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            <button
                className="mt-4 w-full p-2 bg-foreground text-background rounded-md hover:bg-gray-700"
                onClick={handlePost}
            >
                Publicar
            </button>
        </div>
    );
}
