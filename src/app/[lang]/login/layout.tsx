import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return {
        title: `${dict.login} | Aventurei`,
        description: dict.login_subtitle,
        alternates: {
            canonical: `/${lang}/login`,
            languages: {
                'pt-br': '/pt-br/login',
                'es': '/es/login',
                'en': '/en/login',
                'x-default': '/es/login',
            },
        }
    };
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
