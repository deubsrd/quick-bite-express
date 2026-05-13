import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Clock, Bike, Heart, Share2, ArrowLeft } from "lucide-react";
import { getRestaurantBySlug, brl } from "@/lib/data";
import { DishCard } from "@/components/dish-card";

export const Route = createFileRoute("/restaurantes/$slug")({
  loader: ({ params }) => {
    const restaurant = getRestaurantBySlug(params.slug);
    if (!restaurant) throw notFound();
    return { restaurant };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.restaurant.name} — BigSpinner` },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.restaurant.name} no BigSpinner — ${loaderData.restaurant.categoryLabel}, entrega em ${loaderData.restaurant.deliveryMin}-${loaderData.restaurant.deliveryMax} minutos.`
          : "",
      },
      { property: "og:title", content: loaderData?.restaurant.name },
      { property: "og:image", content: loaderData?.restaurant.banner },
      { property: "og:type", content: "restaurant" },
    ],
  }),
  component: RestaurantPage,
});

function RestaurantPage() {
  const { restaurant } = Route.useLoaderData();

  const sections = Array.from(new Set(restaurant.menu.map((d) => d.section)));

  return (
    <div>
      <div className="relative h-48 md:h-72 lg:h-80">
        <img
          src={restaurant.banner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="absolute top-6 left-6">
          <Link
            to="/restaurantes"
            className="inline-flex items-center gap-2 bg-background/70 backdrop-blur px-3 py-2 rounded-full text-xs font-bold border border-border hover:border-brand/50"
          >
            <ArrowLeft className="size-3.5" />
            Restaurantes
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 -mt-16 relative">
        <div className="bg-card rounded-3xl ring-1 ring-border p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="size-20 lg:size-24 rounded-2xl bg-background grid place-items-center text-5xl ring-1 ring-border shrink-0">
            {restaurant.logoEmoji}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border border-border ${
                  restaurant.open ? "text-success" : "text-muted-foreground"
                }`}
              >
                ● {restaurant.open ? "Aberto agora" : "Fechado"}
              </span>
              {restaurant.promo && (
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-brand text-brand-foreground">
                  {restaurant.promo}
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {restaurant.categoryLabel} · {restaurant.distanceKm} km · {restaurant.reviews}{" "}
              avaliações
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-5 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 text-brand fill-brand" />
                <span className="font-bold">{restaurant.rating}</span>
                <span className="text-muted-foreground">({restaurant.reviews})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-brand" />
                <span className="font-mono">
                  {restaurant.deliveryMin}-{restaurant.deliveryMax} min
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bike className="size-4 text-brand" />
                <span className="font-mono">
                  {restaurant.deliveryFee === 0 ? "Grátis" : brl(restaurant.deliveryFee)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              className="size-10 grid place-items-center rounded-full bg-background border border-border hover:border-brand/50 hover:text-brand transition-all"
              aria-label="Favoritar"
            >
              <Heart className="size-4" />
            </button>
            <button
              className="size-10 grid place-items-center rounded-full bg-background border border-border hover:border-brand/50 hover:text-brand transition-all"
              aria-label="Compartilhar"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-8 mt-12 lg:mt-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Cardápio
            </h3>
            <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar">
              {sections.map((s) => (
                <a
                  key={s}
                  href={`#${s.replace(/\s+/g, "-")}`}
                  className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-card hover:text-brand transition-all whitespace-nowrap"
                >
                  {s}
                </a>
              ))}
            </div>
          </aside>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section} id={section.replace(/\s+/g, "-")}>
                <h2 className="text-2xl font-extrabold tracking-tight mb-5">{section}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {restaurant.menu
                    .filter((d) => d.section === section)
                    .map((d) => (
                      <DishCard
                        key={d.id}
                        dish={d}
                        restaurant={restaurant}
                        variant="row"
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
