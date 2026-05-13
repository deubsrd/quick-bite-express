import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getRestaurantsByCategory, type Restaurant } from "@/lib/data";
import { RestaurantCard } from "@/components/restaurant-card";

export const Route = createFileRoute("/categorias/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category, list: getRestaurantsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name} — BigSpinner` },
      {
        name: "description",
        content: `Restaurantes da categoria ${loaderData?.category.name} entregando perto de você.`,
      },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, list } = Route.useLoaderData();

  return (
    <div className="px-4 lg:px-6 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 lg:mb-14">
          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-brand"
          >
            ← Categorias
          </Link>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter mt-3 flex items-center gap-3">
            <span>{category.emoji}</span> {category.name}
          </h1>
          <p className="text-muted-foreground mt-3">
            {list.length} {list.length === 1 ? "restaurante" : "restaurantes"} disponíveis
          </p>
        </header>

        {list.length === 0 ? (
          <div className="bg-card rounded-3xl p-12 text-center ring-1 ring-border">
            <p className="text-muted-foreground">
              Nenhum restaurante por aqui ainda. Tente outra categoria.
            </p>
            <Link
              to="/restaurantes"
              className="inline-block mt-4 bg-brand text-brand-foreground px-5 py-2.5 rounded-xl font-bold hover:brightness-110"
            >
              Ver todos
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {list.map((r: Restaurant) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
