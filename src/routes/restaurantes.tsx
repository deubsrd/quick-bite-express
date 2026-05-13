import { createFileRoute, Link } from "@tanstack/react-router";
import { restaurants, categories } from "@/lib/data";
import { RestaurantCard } from "@/components/restaurant-card";

export const Route = createFileRoute("/restaurantes")({
  head: () => ({
    meta: [
      { title: "Restaurantes — BigSpinner" },
      {
        name: "description",
        content: "Explore todos os restaurantes parceiros do BigSpinner por categoria.",
      },
      { property: "og:title", content: "Restaurantes — BigSpinner" },
      {
        property: "og:description",
        content: "Mais de mil restaurantes para todos os gostos.",
      },
    ],
    links: [{ rel: "canonical", href: "/restaurantes" }],
  }),
  component: RestaurantsPage,
});

function RestaurantsPage() {
  return (
    <div className="px-4 lg:px-6 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono">
            Catálogo completo
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter mt-2">
            Todos os restaurantes
          </h1>
          <p className="text-muted-foreground mt-3">
            {restaurants.length} parceiros entregando perto de você.
          </p>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-10">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categorias/$slug"
              params={{ slug: c.slug }}
              className="flex-none px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-brand/50 hover:text-brand transition-all"
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
