"use client";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import LogoAventurei from "../Logo";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslations } from "@/contexts/LocaleContext";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full justify-between transition-all duration-300 px-[5%] ${isScrolled ? "bg-primary/40 backdrop-blur-md" : "bg-transparent"
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
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href={`/${lang}/sobre`}
            className="text-sm text-center font-medium hover:bg-white/20 px-4 py-2 rounded-full transition-all"
          >
            {t.sobre || 'Sobre'}
          </Link>
          <Link
            href={`/${lang}/se-un-guia`}
            className="text-sm text-center font-medium hover:bg-white/20 px-4 py-2 rounded-full transition-all"
          >
            {t.be_a_guide || 'Seja um Guia'}
          </Link>

          {user ? (
            <Link
              href={`/${lang}/dashboard`}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/10"
            >
              <UserIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{t.dashboard}</span>
            </Link>
          ) : (
            <Link
              href={`/${lang}/login`}
              className="bg-white text-primary hover:bg-white/90 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-white/10"
            >
              {t.login}
            </Link>
          )}

          {user && (
            <button
              onClick={() => signOut()}
              className="text-sm text-center font-medium hover:bg-white/20 px-2 py-2 rounded-full transition-all hover:cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}

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
        <div className="absolute right-10 top-14 w-1/2 bg-primary md:hidden text-white text-center rounded-2xl shadow-2xl border border-white/10">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href={`/${lang}/sobre`}
              className="text-sm font-medium transition-colors hover:bg-white/10 py-2 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.sobre || 'Sobre'}
            </Link>
            <Link
              href={`/${lang}/se-un-guia`}
              className="text-sm font-medium transition-colors hover:bg-white/10 py-2 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.be_a_guide || 'Seja um Guia'}
            </Link>

            <div className="w-full h-[1px] bg-white/10 my-1"></div>

            {user ? (
              <Link
                href={`/${lang}/dashboard`}
                className="text-sm font-bold text-white py-3 bg-white/10 rounded-lg flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserIcon className="w-4 h-4" />
                {t.dashboard}
              </Link>
            ) : (
              <Link
                href={`/${lang}/login`}
                className="text-sm font-bold text-primary py-3 bg-white rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.login}
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold text-red-400 py-3 bg-white/5 rounded-lg flex items-center justify-center gap-2 mt-2"
              >
                <LogOut className="h-4 w-4" />
                {t.logout || 'Sair'}
              </button>
            )}
            <div className="mt-2 flex justify-center">
              <LanguageSwitcher currentLocale={lang} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
