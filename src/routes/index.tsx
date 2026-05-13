import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Clock, Zap, Tag } from "lucide-react";
import heroBurger from "@/assets/hero-burger.jpg";
import { categories, restaurants, mostOrdered, brl } from "@/lib/data";
import { RestaurantCard } from "@/components/restaurant-card";
import { DishCard } from "@/components/dish-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BigSpinner — Peça sua comida favorita sem sair de casa" },
      {
        name: "description",
        content:
          "Mais de mil restaurantes na palma da sua mão. Entrega em até 25 minutos. Peça pelo BigSpinner.",
      },
      { property: "og:title", content: "BigSpinner — Delivery premium" },
      {
        property: "og:description",
        content: "Velocidade premium. Os melhores restaurantes entregues em minutos.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = restaurants.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative px-4 lg:px-6 pt-8 lg:pt-12 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="animate-reveal">
            <span className="inline-block bg-brand/10 text-brand px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
              Premium Delivery
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8">
              Peça sua comida <br />
              favorita <span className="text-brand">sem sair de casa.</span>
            </h1>
            <form className="relative max-w-xl group" onSubmit={(e) => e.preventDefault()}>
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pratos, restaurantes ou categorias..."
                className="w-full bg-card border border-border h-14 lg:h-16 pl-14 pr-32 lg:pr-36 rounded-2xl focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-all text-base lg:text-lg"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand text-brand-foreground px-5 lg:px-6 rounded-xl font-bold hover:brightness-110 transition-all cursor-pointer">
                Buscar
              </button>
            </form>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-muted-foreground">
              <Stat icon={Clock} label="Entrega em" value="15–25 min" />
              <Stat icon={Zap} label="Restaurantes" value="+1.200" />
              <Stat icon={Tag} label="Cupons ativos" value="24" />
            </div>
          </div>
          <div className="relative animate-reveal [animation-delay:200ms]">
            <div className="w-full aspect-square rounded-3xl overflow-hidden ring-1 ring-border bg-card">
              <img
                src={heroBurger}
                alt="Hambúrguer artesanal premium"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-brand text-brand-foreground p-5 lg:p-6 rounded-2xl shadow-glow">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                Entrega em
              </p>
              <p className="text-2xl lg:text-3xl font-extrabold font-mono">15-25 min</p>
            </div>
            <div className="hidden lg:block absolute -top-4 -right-4 bg-card border border-border p-4 rounded-2xl shadow-card">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Frete grátis
              </p>
              <p className="text-sm font-extrabold mt-0.5">Acima de {brl(40)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO STRIP */}
      <section className="bg-brand text-brand-foreground py-3 overflow-hidden">
        <div className="flex gap-12 animate-pulse text-sm font-bold uppercase tracking-widest font-mono whitespace-nowrap justify-center">
          <span>● Cupom SPINNER10 — 10% OFF no primeiro pedido</span>
          <span className="hidden md:inline">● Frete grátis até 22h</span>
          <span className="hidden lg:inline">● Cashback 5% no app</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-card py-10 lg:py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Categorias</h2>
            <span className="text-xs font-mono text-muted-foreground">
              {categories.length} disponíveis
            </span>
          </div>
          <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/categorias/$slug"
                params={{ slug: c.slug }}
                className="flex-none group"
              >
                <div className="size-24 lg:size-28 bg-background rounded-2xl flex flex-col items-center justify-center border border-border group-hover:border-brand/60 group-hover:-translate-y-1 transition-all">
                  <span className="text-3xl lg:text-4xl mb-1.5">{c.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight px-2 text-center">
                    {c.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 lg:py-24 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 lg:mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
                Restaurantes em destaque
              </h2>
              <p className="text-muted-foreground">
                Os favoritos da sua região com entrega ultra-rápida
              </p>
            </div>
            <Link
              to="/restaurantes"
              className="hidden md:inline-flex text-brand font-bold text-sm uppercase tracking-widest border-b-2 border-brand pb-1 hover:brightness-125 transition-all"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      </section>

      {/* MOST ORDERED */}
      <section className="py-16 lg:py-20 px-4 lg:px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
                Mais pedidos da semana
              </h2>
              <p className="text-muted-foreground">
                O que está bombando na sua cidade agora
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {mostOrdered.map((m) => (
              <DishCard key={m.dish.id} dish={m.dish} restaurant={m.restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-16 lg:py-24 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <Perk
            title="Programa Spinner+"
            text="Acumule pontos a cada pedido e troque por descontos exclusivos."
            tag="Fidelidade"
          />
          <Perk
            title="Cashback automático"
            text="Receba 5% de volta no app a cada pedido pago via PIX."
            tag="Cashback"
          />
          <Perk
            title="Entrega agendada"
            text="Programe seu pedido para chegar exatamente na hora que você precisa."
            tag="Agendamento"
          />
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-brand" />
      <div>
        <span className="text-[10px] uppercase tracking-widest font-mono">{label}</span>
        <p className="text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Perk({ title, text, tag }: { title: string; text: string; tag: string }) {
  return (
    <div className="bg-card rounded-3xl p-8 ring-1 ring-border hover:ring-brand/30 transition-all group">
      <span className="inline-block bg-brand/10 text-brand px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
        {tag}
      </span>
      <h3 className="text-xl font-extrabold mb-2 group-hover:text-brand transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
