import { Link } from "@tanstack/react-router";
import { useCart, cartTotals } from "@/lib/cart-store";
import { brl } from "@/lib/data";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function CartSheet() {
  const { items, isOpen, setOpen, setQty, remove, coupon, applyCoupon } = useCart();
  const totals = cartTotals(items, coupon);
  const [code, setCode] = useState("");

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-card border-border">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingBag className="size-4 text-brand" />
            Seu Carrinho
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "itens"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <div className="size-16 rounded-full bg-background grid place-items-center mx-auto mb-4 ring-1 ring-border">
                <ShoppingBag className="size-6 text-muted-foreground" />
              </div>
              <p className="font-bold mb-1">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">
                Explore os restaurantes e adicione seus pratos favoritos.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="size-16 rounded-xl overflow-hidden bg-background ring-1 ring-border shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {item.restaurantName}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-background rounded-full ring-1 ring-border">
                        <button
                          onClick={() => setQty(item.id, item.quantity - 1)}
                          className="size-7 grid place-items-center hover:text-brand transition-colors cursor-pointer"
                          aria-label="Diminuir"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.id, item.quantity + 1)}
                          className="size-7 grid place-items-center hover:text-brand transition-colors cursor-pointer"
                          aria-label="Aumentar"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">
                        {brl(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 self-start cursor-pointer"
                    aria-label="Remover"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-6 space-y-4 bg-background">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Cupom (ex: SPINNER10)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-9 h-10 bg-card border-border text-sm"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!code) return;
                    applyCoupon(code);
                    toast.success(`Cupom ${code.toUpperCase()} aplicado`);
                    setCode("");
                  }}
                  className="px-4 h-10 rounded-md bg-card border border-border text-xs font-bold hover:border-brand/50 cursor-pointer"
                >
                  Aplicar
                </button>
              </div>

              <div className="space-y-1.5 text-sm">
                <Row label="Subtotal" value={brl(totals.subtotal)} />
                <Row label="Taxa de entrega" value={brl(totals.delivery)} />
                {totals.discount > 0 && (
                  <Row
                    label={`Desconto (${coupon})`}
                    value={`- ${brl(totals.discount)}`}
                    accent
                  />
                )}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Total
                </span>
                <span className="text-2xl font-extrabold text-brand">
                  {brl(totals.total)}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="block w-full bg-brand text-brand-foreground text-center font-extrabold py-4 rounded-xl hover:brightness-110 transition-all"
              >
                Finalizar pedido
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-success font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
