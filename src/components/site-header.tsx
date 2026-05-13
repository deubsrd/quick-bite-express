import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, MapPin, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function SiteHeader() {
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl lg:text-2xl font-extrabold tracking-tighter text-brand">
            BIGSPINNER
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              to="/restaurantes"
              className="hover:text-brand transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              Restaurantes
            </Link>
            <Link
              to="/pedidos"
              className="hover:text-brand transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              Pedidos
            </Link>
            <Link
              to="/admin"
              className="hover:text-brand transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden lg:flex bg-white/5 px-4 py-2 rounded-full border border-border items-center gap-2">
            <span className="size-2 bg-brand rounded-full animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">
              R. Oscar Freire, 1020
            </span>
            <MapPin className="size-3 text-muted-foreground" />
          </div>
          <Link
            to="/restaurantes"
            className="size-10 grid place-items-center rounded-full bg-card border border-border hover:border-brand/50 transition-colors"
            aria-label="Buscar"
          >
            <Search className="size-4" />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="relative size-10 grid place-items-center rounded-full bg-brand text-brand-foreground hover:brightness-110 transition-all cursor-pointer"
            aria-label="Carrinho"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold size-5 grid place-items-center rounded-full">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/checkout"
            className="hidden md:grid size-10 place-items-center rounded-full bg-card border border-border hover:border-brand/50 transition-colors"
            aria-label="Conta"
          >
            <User className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
