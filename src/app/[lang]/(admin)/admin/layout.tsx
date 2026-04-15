'use client'
import { Layout } from "@/components/Layout/Layout"
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const lang = params?.lang as string;

    const tabs = [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "/admin",
        },
        {
            id: "guides",
            label: "Gestão de Guias",
            href: "/admin/guides",
        },
        {
            id: "blog",
            label: "Blog",
            href: "/admin/blog",
        },
        {
            id: "financeiro",
            label: "Financeiro",
            href: "/admin/financeiro",
        },
    ]

    // Determine a aba ativa baseada na URL atual
    // Removemos o prefixo de idioma (/pt, /es, etc) para comparar com os hrefs definidos
    const pathWithoutLang = pathname.replace(`/${lang}`, "") || "/";

    // Encontramos a aba cujo href mais se aproxima do caminho atual
    // Para o dashboard, buscamos uma correspondência exata ou raiz
    const activeTab = tabs.reduce((prev, curr) => {
        if (curr.id === "dashboard") {
            if (pathWithoutLang === "/admin" || pathWithoutLang === "/admin/") return curr;
            return prev;
        }
        if (pathWithoutLang.startsWith(curr.href)) {
            // Se já temos um match, pegamos o que tem o href mais longo (mais específico)
            if (!prev || curr.href.length > prev.href.length) return curr;
        }
        return prev;
    }, null as any)?.id || (pathWithoutLang === "/admin" ? "dashboard" : undefined);

    return <Layout>
        {/* Header Section */}
        <div className="relative overflow-hidden bg-primary/60 px-[5%] mt-[-8vh] pt-[10vh] pb-8">
            {/* Background Banner Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"}
                    alt={'Dashboard Banner'}
                    fill
                    className="object-cover opacity-20 grayscale-[20%]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
            </div>
        </div>
        <div className="min-h-[80vh] flex flex-row justify-between gap-4">
            <div className="w-1/4">
                <div className="bg-primary/10 h-[calc(100vh-16vh)] p-4 rounded-none rounded-r-3xl flex flex-col gap-2 pt-10 my-4 shadow-inner">
                    {tabs.map((tab) => (
                        <div key={tab.id}>
                            <Button
                                fullWidth
                                variant={activeTab === tab.id ? "primary" : "secondary"}
                                className={`justify-start font-medium ${activeTab === tab.id ? "shadow-md" : ""}`}
                                onPress={() => router.push(`/${lang}${tab.href}`)}
                            >
                                {tab.label}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-3/4 p-4">
                {children}
            </div>
        </div>
    </Layout>
}