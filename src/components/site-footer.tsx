export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="text-2xl font-extrabold tracking-tighter text-brand mb-3">
            BIGSPINNER
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Velocidade premium. Os melhores restaurantes da sua cidade entregues
            em minutos.
          </p>
        </div>
        <FooterCol
          title="Plataforma"
          items={["Restaurantes", "Categorias", "Cupons", "Programa de fidelidade"]}
        />
        <FooterCol
          title="Suporte"
          items={["Central de ajuda", "Termos de uso", "Privacidade", "Trabalhe conosco"]}
        />
        <FooterCol
          title="Para parceiros"
          items={["Cadastre seu restaurante", "Seja entregador", "Painel admin", "API"]}
        />
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <span>© 2026 BigSpinner — Tecnologia que alimenta.</span>
          <span>Feito com ⚡ no Brasil</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h5 className="text-xs font-bold uppercase tracking-widest mb-4">{title}</h5>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-brand transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
