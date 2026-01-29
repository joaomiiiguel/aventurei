import { Mountain } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Mountain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Aventura<span className="text-gold">BR</span></span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Conectando aventureiros a guias experientes em todo o Brasil. 
              Descubra experiências únicas em contato com a natureza.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Aventuras</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Guias</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Destinos</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Modalidades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Como funciona</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Seja um Guia</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">Contato</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AventuraBR. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
