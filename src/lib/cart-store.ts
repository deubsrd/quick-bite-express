import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  coupon: string | null;
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  applyCoupon: (code: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      coupon: null,
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.id !== id)
            : s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [], coupon: null }),
      setOpen: (open) => set({ isOpen: open }),
      applyCoupon: (code) => set({ coupon: code.toUpperCase() }),
    }),
    { name: "bigspinner-cart" }
  )
);

export const DELIVERY_FEE = 5.9;

export function cartTotals(
  items: CartItem[],
  coupon: string | null
): { subtotal: number; delivery: number; discount: number; total: number } {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const delivery = items.length === 0 ? 0 : DELIVERY_FEE;
  let discount = 0;
  if (coupon === "SPINNER10") discount = subtotal * 0.1;
  if (coupon === "BRASA20") discount = subtotal * 0.2;
  const total = Math.max(0, subtotal + delivery - discount);
  return { subtotal, delivery, discount, total };
}
