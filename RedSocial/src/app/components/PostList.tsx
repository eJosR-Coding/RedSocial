"use client";

interface PostListProps {
  posts: string[]; // Arreglo de publicaciones
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="w-full max-w-xl">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="bg-foreground text-background p-4 mb-4 rounded-md shadow-md"
          >
            {post}
          </div>
        ))
      ) : (
        <p className="text-foreground">Aún no has publicado nada.</p>
      )}
    </div>
  );
}
