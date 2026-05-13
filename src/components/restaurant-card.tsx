import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { brl, type Restaurant } from "@/lib/data";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      to="/restaurantes/$slug"
      params={{ slug: restaurant.slug }}
      className="group block"
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl ring-1 ring-border group-hover:ring-brand/40 transition-all">
        <img
          src={restaurant.banner}
          alt={restaurant.name}
          loading="lazy"
          width={1200}
          height={600}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-background/80 backdrop-blur px-3 py-1 rounded-full border border-border text-[10px] font-mono uppercase">
            {restaurant.open ? (
              <span className="text-success">● Aberto</span>
            ) : (
              <span className="text-muted-foreground">Fechado</span>
            )}
          </span>
          {restaurant.promo && (
            <span className="bg-brand text-brand-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase">
              {restaurant.promo}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-lg font-bold mb-1 group-hover:text-brand transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {restaurant.categoryLabel} · {restaurant.distanceKm} km
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-brand font-bold">
            <Star className="size-3.5 fill-brand" />
            <span className="text-sm">{restaurant.rating}</span>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
            {restaurant.deliveryMin}-{restaurant.deliveryMax} min
          </p>
          <p className="text-[10px] font-mono text-muted-foreground">
            {restaurant.deliveryFee === 0 ? "Grátis" : brl(restaurant.deliveryFee)}
          </p>
        </div>
      </div>
    </Link>
  );
}
