import { createFileRoute, Link } from "@tanstack/react-router";
import { brl } from "@/lib/data";
import { Check, Bike, ChefHat, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Meus pedidos — BigSpinner" },
      { name: "description", content: "Acompanhe seus pedidos em tempo real no BigSpinner." },
    ],
  }),
  component: OrdersPage,
});

const mockOrders = [
  {
    id: "BS-2841",
    status: "out" as const,
    restaurant: "Big Spinner Burger",
    items: ["1x Bacon Smash Burger", "1x Combo Spinner Solo"],
    total: 84.8,
    eta: "8 min",
    placedAt: "Há 22 min",
  },
  {
    id: "BS-2810",
    status: "delivered" as const,
    restaurant: "Forno & Arte Pizzaria",
    items: ["1x Pizza Pepperoni Premium", "1x Coca-Cola 2L"],
    total: 71.0,
    eta: "Entregue",
    placedAt: "Ontem, 20:34",
  },
];

const STAGES = [
  { key: "received", label: "Recebido", icon: Check },
  { key: "preparing", label: "Preparando", icon: ChefHat },
  { key: "out", label: "Saiu para entrega", icon: Bike },
  { key: "delivered", label: "Entregue", icon: PackageCheck },
] as const;

function OrdersPage() {
  return (
    <div className="px-4 lg:px-6 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono">
            Acompanhamento em tempo real
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter mt-2">
            Meus pedidos
          </h1>
        </header>

        <div className="space-y-6">
          {mockOrders.map((order) => {
            const currentIdx = STAGES.findIndex((s) => s.key === order.status);
            return (
              <article
                key={order.id}
                className="bg-card ring-1 ring-border rounded-3xl p-6 lg:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">
                      Pedido #{order.id} · {order.placedAt}
                    </p>
                    <h2 className="text-xl font-extrabold mt-1">{order.restaurant}</h2>
                    <ul className="text-sm text-muted-foreground mt-2">
                      {order.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      Total
                    </p>
                    <p className="text-2xl font-extrabold text-brand">{brl(order.total)}</p>
                    <p className="text-xs font-mono mt-1">
                      {order.status === "delivered" ? "Entregue" : `ETA ${order.eta}`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 lg:gap-4">
                  {STAGES.map((stage, idx) => {
                    const Icon = stage.icon;
                    const active = idx <= currentIdx;
                    return (
                      <div key={stage.key} className="flex flex-col items-center text-center">
                        <div
                          className={`size-10 lg:size-12 grid place-items-center rounded-full mb-2 transition-all ${
                            active
                              ? "bg-brand text-brand-foreground shadow-glow"
                              : "bg-background border border-border text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-4 lg:size-5" />
                        </div>
                        <span
                          className={`text-[10px] lg:text-xs font-bold uppercase tracking-wider ${
                            active ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 bg-card ring-1 ring-border rounded-3xl p-8 text-center">
          <p className="text-muted-foreground text-sm">
            Quer pedir de novo?{" "}
            <Link to="/restaurantes" className="text-brand font-bold hover:underline">
              Explorar restaurantes
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
