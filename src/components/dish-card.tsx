import { Plus } from "lucide-react";
import { brl, type Dish, type Restaurant } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export function DishCard({
  dish,
  restaurant,
  variant = "grid",
}: {
  dish: Dish;
  restaurant: Restaurant;
  variant?: "grid" | "row";
}) {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);

  const handleAdd = () => {
    add({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
    toast.success(`${dish.name} adicionado`, {
      action: { label: "Ver carrinho", onClick: () => setOpen(true) },
    });
  };

  if (variant === "row") {
    return (
      <div className="flex gap-4 p-4 rounded-2xl bg-card ring-1 ring-border hover:ring-brand/30 transition-all group">
        <div className="flex-1 min-w-0">
          <h4 className="font-bold mb-1">{dish.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {dish.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-brand">{brl(dish.price)}</span>
            <button
              onClick={handleAdd}
              className="bg-brand text-brand-foreground text-xs font-bold px-3 py-1.5 rounded-full hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="size-3" />
              Adicionar
            </button>
          </div>
        </div>
        <div className="size-24 shrink-0 rounded-xl overflow-hidden bg-background">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-border mb-3">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 size-10 rounded-full bg-brand text-brand-foreground grid place-items-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
          aria-label={`Adicionar ${dish.name}`}
        >
          <Plus className="size-5" strokeWidth={2.5} />
        </button>
      </div>
      <h4 className="font-bold text-sm">{dish.name}</h4>
      <p className="text-xs text-muted-foreground mt-0.5">{restaurant.name}</p>
      <p className="text-sm font-bold mt-1.5">{brl(dish.price)}</p>
    </div>
  );
}
