import { create } from 'zustand';
import { formatDistanceToNow } from 'date-fns';

interface ImagePost {
  id: string;
  imageUrl: string;
  analysis: string;
  timestamp: number;
  likes: number;
}

interface ImageStore {
  posts: ImagePost[];
  addPost: (imageUrl: string, analysis: string) => void;
  likePost: (id: string) => void;
  getTimeAgo: (timestamp: number) => string;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  posts: [],
  addPost: (imageUrl: string, analysis: string) => {
    const newPost: ImagePost = {
      id: crypto.randomUUID(),
      imageUrl,
      analysis,
      timestamp: Date.now(),
      likes: 0,
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },
  likePost: (id: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  },
  getTimeAgo: (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  },
}));