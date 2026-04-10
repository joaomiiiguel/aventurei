import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Layout } from "@/components/Layout/Layout";
import BlogView from "@/components/Views/BlogView";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return constructMetadata({
    title: "Blog de Aventurei",
    description: "Historias de expediciones, guías de destinos en España y contenidos para tu próxima aventura.",
    lang,
    slug: "/blog",
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <Layout>
      <BlogView />
    </Layout>
  );
}
