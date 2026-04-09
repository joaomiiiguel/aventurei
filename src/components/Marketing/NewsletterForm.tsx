"use client";
import { useState } from "react";
import { useTranslations } from "@/contexts/LocaleContext";

export default function NewsletterForm() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Conectar ao banco de dados ou provedor de e-mail (ex: Supabase, Resend)
      console.log("Subscribed:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm mt-4 md:mt-0">
      <h4 className="mb-2 text-lg font-bold text-white">
        {t.newsletter_title || "Receba Novidades"}
      </h4>
      <p className="mb-4 text-sm text-green-50/80">
        {t.newsletter_desc || "Inscreva-se para receber promoções exclusivas e dicas de aventuras."}
      </p>

      {subscribed ? (
        <div className="rounded bg-green-500/20 p-3 text-sm font-medium text-green-100 border border-green-500/30">
          {t.newsletter_success || "Inscrição realizada com sucesso!"}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter_placeholder || "Seu melhor e-mail"}
            className="w-full rounded-md border border-white/20 bg-white/5 py-2 px-3 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition"
            required
          />
          <button
            type="submit"
            className="w-full rounded-md bg-white py-2 text-sm font-bold text-primary transition hover:bg-green-50 active:scale-95 mt-1"
          >
            {t.newsletter_btn || "Inscrever-se"}
          </button>
        </form>
      )}
    </div>
  );
}
