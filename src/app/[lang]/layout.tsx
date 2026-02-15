import { getDictionary } from "@/lib/dictionary";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

/**
 * Layout for [lang] routes
 * This layout loads the dictionary for the current locale and provides it to all child components
 */
export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${lang}'`,
        }}
      />
      <AuthProvider>
        <LocaleProvider dictionary={dictionary}>
          {children}
        </LocaleProvider>
      </AuthProvider>
    </>
  );
}

