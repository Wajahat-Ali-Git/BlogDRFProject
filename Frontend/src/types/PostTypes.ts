export type PostType = {
  id: number;
  title: string;
  content: string;
  category?: string;
  author_name: string;
  created_at: string;
  image: string | null;
  likes_count: number;
  views: number;
  is_liked: boolean;
  category_name: string;
  is_published?: boolean;
};
