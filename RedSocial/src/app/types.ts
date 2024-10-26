// types.ts
export interface Post {
    _id: string;
    title: string;
    body: string;
    createdAt: string;
    // other properties if needed
  }
  
  export interface Comment {
    _id: string;
    body: string;
    user: { username: string };
    createdAt: string;

  }
  