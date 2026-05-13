import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cartTotals } from "@/lib/cart-store";
import { brl } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Banknote, QrCode, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — BigSpinner" },
      { name: "description", content: "Complete seu pedido com segurança no BigSpinner." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, coupon, clear } = useCart();
  const totals = cartTotals(items, coupon);
  const [payment, setPayment] = useState("pix");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }
    toast.success("Pedido confirmado! Acompanhe na aba Pedidos.", { duration: 4000 });
    clear();
    setTimeout(() => navigate({ to: "/pedidos" }), 600);
  };

  return (
    <div className="px-4 lg:px-6 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono">
            Checkout seguro
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tighter mt-2">
            Finalizar pedido
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <Section title="Identificação" step="01">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nome completo">
                  <Input required placeholder="Seu nome" />
                </Field>
                <Field label="WhatsApp">
                  <Input required placeholder="(11) 90000-0000" />
                </Field>
                <Field label="E-mail" className="sm:col-span-2">
                  <Input type="email" required placeholder="voce@email.com" />
                </Field>
              </div>
            </Section>

            <Section title="Endereço de entrega" step="02">
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="CEP">
                  <Input required placeholder="00000-000" />
                </Field>
                <Field label="Rua" className="sm:col-span-2">
                  <Input required placeholder="Av. Paulista" />
                </Field>
                <Field label="Número">
                  <Input required placeholder="1000" />
                </Field>
                <Field label="Complemento" className="sm:col-span-2">
                  <Input placeholder="Apto / Bloco" />
                </Field>
              </div>
              <Field label="Observações do pedido" className="mt-4">
                <Textarea
                  placeholder="Sem cebola, ponto da carne, instruções para o entregador..."
                  rows={3}
                />
              </Field>
            </Section>

            <Section title="Pagamento" step="03">
              <RadioGroup value={payment} onValueChange={setPayment} className="grid gap-3">
                <PayOption
                  value="pix"
                  icon={QrCode}
                  title="PIX"
                  hint="Aprovação imediata · 5% cashback"
                />
                <PayOption
                  value="card"
                  icon={CreditCard}
                  title="Cartão de crédito"
                  hint="Visa, Master, Elo · até 3x sem juros"
                />
                <PayOption
                  value="cash"
                  icon={Banknote}
                  title="Dinheiro na entrega"
                  hint="Informe o troco se necessário"
                />
              </RadioGroup>
              <p className="text-[10px] text-muted-foreground mt-4 flex items-center gap-1.5">
                <ShieldCheck className="size-3 text-brand" />
                Integração Mercado Pago pronta para ativação no painel admin.
              </p>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-card ring-1 ring-border rounded-3xl p-6 space-y-5">
              <h3 className="font-extrabold text-lg">Resumo do pedido</h3>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Seu carrinho está vazio.{" "}
                  <Link to="/restaurantes" className="text-brand font-bold">
                    Ver restaurantes
                  </Link>
                </p>
              ) : (
                <>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((i) => (
                      <div key={i.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          <span className="text-brand font-mono">{i.quantity}x</span> {i.name}
                        </span>
                        <span className="font-medium">{brl(i.price * i.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-1.5 text-sm">
                    <Row label="Subtotal" value={brl(totals.subtotal)} />
                    <Row label="Entrega" value={brl(totals.delivery)} />
                    {totals.discount > 0 && (
                      <Row
                        label={`Cupom ${coupon}`}
                        value={`- ${brl(totals.discount)}`}
                        accent
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      Total
                    </span>
                    <span className="text-2xl font-extrabold text-brand">
                      {brl(totals.total)}
                    </span>
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full bg-brand text-brand-foreground font-extrabold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Confirmar pedido
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card ring-1 ring-border rounded-3xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="size-8 rounded-lg bg-brand/10 text-brand grid place-items-center font-mono text-xs font-bold">
          {step}
        </span>
        <h2 className="font-extrabold text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
        {label}
      </Label>
      {children}
    </div>
  );
}

function PayOption({
  value,
  icon: Icon,
  title,
  hint,
}: {
  value: string;
  icon: React.ElementType;
  title: string;
  hint: string;
}) {
  return (
    <Label
      htmlFor={value}
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-brand/50 cursor-pointer transition-all has-[:checked]:border-brand has-[:checked]:bg-brand/5"
    >
      <RadioGroupItem id={value} value={value} className="border-border" />
      <Icon className="size-5 text-brand" />
      <div className="flex-1">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
    </Label>
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
