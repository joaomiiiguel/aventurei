import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return constructMetadata({
        title: dict.login,
        description: dict.login_subtitle,
        lang,
        slug: "/login",
    });
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
