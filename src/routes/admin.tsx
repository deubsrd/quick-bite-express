import { createFileRoute } from "@tanstack/react-router";
import { restaurants, brl } from "@/lib/data";
import { TrendingUp, ShoppingBag, DollarSign, Star } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — BigSpinner" },
      { name: "description", content: "Painel de controle para gestão de restaurantes e pedidos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const recentOrders = [
  { id: "BS-2841", customer: "Lucas A.", restaurant: "Big Spinner Burger", total: 84.8, status: "Saiu p/ entrega" },
  { id: "BS-2840", customer: "Marina S.", restaurant: "Forno & Arte", total: 59.0, status: "Preparando" },
  { id: "BS-2839", customer: "Pedro R.", restaurant: "Brasa House", total: 178.0, status: "Recebido" },
  { id: "BS-2838", customer: "Júlia M.", restaurant: "Açaí do Porto", total: 45.0, status: "Entregue" },
];

const topProducts = [
  { name: "Bacon Smash Burger", count: 312 },
  { name: "Pizza Pepperoni Premium", count: 248 },
  { name: "Açaí Completo 500ml", count: 197 },
  { name: "Combinado Premium 24 peças", count: 142 },
];

function AdminPage() {
  return (
    <div className="px-4 lg:px-6 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono">
              Painel admin · Visão geral
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tighter mt-2">
              Dashboard
            </h1>
          </div>
          <button className="bg-brand text-brand-foreground font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all">
            + Novo restaurante
          </button>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          <KPI label="Pedidos hoje" value="284" delta="+12%" icon={ShoppingBag} />
          <KPI label="Faturamento" value={brl(18420.5)} delta="+8.4%" icon={DollarSign} />
          <KPI label="Ticket médio" value={brl(64.85)} delta="+2.1%" icon={TrendingUp} />
          <KPI label="Avaliação média" value="4.8" delta="+0.1" icon={Star} />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-card ring-1 ring-border rounded-3xl p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-extrabold text-lg">Pedidos recentes</h2>
              <span className="text-xs font-mono text-muted-foreground">Atualizado agora</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    <th className="pb-3">Pedido</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Restaurante</th>
                    <th className="pb-3 text-right">Total</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-3 font-mono text-brand">{o.id}</td>
                      <td className="py-3">{o.customer}</td>
                      <td className="py-3 text-muted-foreground">{o.restaurant}</td>
                      <td className="py-3 text-right font-bold">{brl(o.total)}</td>
                      <td className="py-3 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-background border border-border text-[10px] font-bold uppercase">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-card ring-1 ring-border rounded-3xl p-6 lg:p-8">
            <h2 className="font-extrabold text-lg mb-6">Mais vendidos</h2>
            <div className="space-y-4">
              {topProducts.map((p, i) => {
                const max = topProducts[0].count;
                return (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">
                        <span className="text-brand font-mono mr-2">#{i + 1}</span>
                        {p.name}
                      </span>
                      <span className="font-mono text-muted-foreground">{p.count}</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand"
                        style={{ width: `${(p.count / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Restaurantes parceiros</h2>
            <span className="text-xs font-mono text-muted-foreground">
              {restaurants.length} ativos
            </span>
          </div>
          <div className="bg-card ring-1 ring-border rounded-3xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground font-mono bg-background">
                  <th className="p-4">Restaurante</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4 text-right">Avaliação</th>
                  <th className="p-4 text-right">Tempo</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {restaurants.map((r) => (
                  <tr key={r.id} className="hover:bg-background/50 transition-colors">
                    <td className="p-4 font-bold flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-background grid place-items-center text-xl">
                        {r.logoEmoji}
                      </span>
                      {r.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{r.categoryLabel}</td>
                    <td className="p-4 text-right font-mono">★ {r.rating}</td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      {r.deliveryMin}-{r.deliveryMax}min
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`text-[10px] font-mono uppercase ${
                          r.open ? "text-success" : "text-muted-foreground"
                        }`}
                      >
                        ● {r.open ? "Aberto" : "Fechado"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-card ring-1 ring-border rounded-2xl p-5 hover:ring-brand/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">
          {label}
        </span>
        <Icon className="size-4 text-brand" />
      </div>
      <p className="text-2xl lg:text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="text-xs text-success font-mono mt-1">{delta} vs ontem</p>
    </div>
  );
}
