"use client";
import Link from "next/link";
import { useTranslations } from "@/contexts/LocaleContext";
import { useParams } from "next/navigation";
import LogoAventurei from "../Logo";

export function Footer() {
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;

  return (
    <footer className="bg-primary text-white">
      <div className="container pt-12 pb-4 px-[5%] mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 block">
              <LogoAventurei variant="white" />
            </Link>
            <p className="max-w-sm text-sm text-green-50/80">
              {t.connect_with_best_guides || "Conectando aventureiros a guias experientes em todo o Brasil. Descubra experiências únicas em contato com a natureza."}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">{t.explore || "Explorar"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.passeios || "Aventuras"}</Link></li>
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.guias || "Guias"}</Link></li>
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.destinations || "Destinos"}</Link></li>
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.modalities || "Modalidades"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">{t.support || "Suporte"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.how_it_works || "Como funciona"}</Link></li>
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.be_a_guide || "Seja um Guia"}</Link></li>
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.contato || "Contato"}</Link></li>
              <li><Link href={`/${lang}`} className="text-green-100/70 transition-colors hover:text-white">{t.faq || "FAQ"}</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-green-100/50">
          © {new Date().getFullYear()} Aventurei. {t.all_rights_reserved || "Todos os direitos reservados."}
        </div>
      </div>

      {/* Fixed Demo Notice */}
      <div className="fixed bottom-0 z-50 w-full bg-gold/90 py-2 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-sm md:text-xs">
        {t.display_only_notice}
      </div>

      {/* Spacer to avoid fixed banner overlapping footer content */}
      <div className="h-8 md:h-10" />
    </footer>
  );
}

