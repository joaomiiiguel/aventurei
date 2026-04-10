export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  image_url: string | null;
  published: boolean;
  author_name: string;
  created_at: string;
  updated_at: string;
};
