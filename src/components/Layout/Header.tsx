"use client";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import LogoAventurei from "../Logo";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslations } from "@/contexts/LocaleContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full justify-between transition-all duration-300 px-[5%] ${isScrolled ? "bg-[#00382F]/40 backdrop-blur-md" : "bg-transparent"
        }`}
    >
      <div className="w-full flex h-16 items-center justify-between text-white">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <LogoAventurei variant="white" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/${lang}`}
            className="text-sm text-center font-medium hover:text-white/80 hover:font-bold"
          >
            {t.sobre || 'Sobre'}
          </Link>
          <Link
            href={`/${lang}`}
            className="text-sm text-center font-medium hover:text-white/80 hover:font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.be_a_guide || 'Seja um Guia'}
          </Link>
          <LanguageSwitcher currentLocale={lang} />
        </nav>


        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden text-white hover:cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute right-10 top-14 w-1/2 bg-[#00382F] md:hidden text-white text-center">
          <nav className="flex flex-col gap-2 p-2">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium transition-colors hover:bg-white/10 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.passeios || 'Aventuras'}
            </Link>
            <Link
              href={`/${lang}`}
              className="text-sm font-medium transition-colors hover:bg-white/10 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.guias || 'Guias'}
            </Link>
            <Link
              href={`/${lang}`}
              className="text-sm font-medium transition-colors hover:bg-white/10 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.sobre || 'Sobre'}
            </Link>
            <div className="w-full h-[1px] bg-white/10"></div>
            <Link
              href={`/${lang}`}
              className="text-sm font-medium transition-colors hover:bg-white/10 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.be_a_guide || 'Seja um Guia'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
