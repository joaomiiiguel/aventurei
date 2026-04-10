import { Metadata } from "next";
import BlogPost from "../../../../../components/Views/BlogPost";
import { createClient } from "@/utils/supabase/server";
import { constructMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string; lang: string }>;
};

// Generate static params from Supabase posts
export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from("posts")
      .select("slug")
      .eq("published", true);

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

// Fetch post data for metadata
async function getPostData(slug: string) {
  try {
    const supabase = await createClient();
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !post) return null;

    // Validate minimum content length
    const contentLength = post.content
      ? post.content.replace(/<[^>]*>/g, "").length
      : 0;

    if (contentLength < 300 || !post.title || post.title.length < 10) {
      return null;
    }

    return post;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return constructMetadata({
      title: "Artículo no encontrado",
      noIndex: true,
      lang,
    });
  }

  return constructMetadata({
    title: post.title,
    description: post.description ?? undefined,
    image: post.image_url ?? undefined,
    slug: `/blog/${post.slug}`,
    lang,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <BlogPost slug={slug} />;
}
