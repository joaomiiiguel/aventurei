"use client";
import { Mountain } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/contexts/LocaleContext";
import { useParams } from "next/navigation";
import LogoAventurei from "../Logo";

export function Footer() {
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;

  return (
    <footer className="bg-[#00382F] text-white">
      <div className="container py-12 px-[5%]">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${lang}`} className="mb-4 flex items-center gap-2">
              <LogoAventurei />
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

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-green-100/50">
          © {new Date().getFullYear()} Aventurei. {t.all_rights_reserved || "Todos os direitos reservados."}
        </div>
      </div>
    </footer>
  );
}

