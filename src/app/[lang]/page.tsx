import { Layout } from "@/components/Layout/Layout";
import HomeContent from "@/components/Views/HomeContent";

interface LangPageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Root page for [lang] route - Renders the home page directly
 */
export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;
  
  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
}


