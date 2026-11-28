import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, whatsappUrl } from "../api/client";
import type { Order, Product } from "../api/types";
import { useCatalog } from "../api/CatalogContext";

export type CartItem = {
  productId: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  totalLabel: string;
  lines: { product: Product; qty: number; lineTotal: number }[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  checkoutWhatsAppUrl: string;
  placeOrder: () => Promise<{ order: Order; whatsappUrl: string }>;
  placing: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { products, contact } = useCatalog();
  const [items, setItems] = useState<CartItem[]>([]);
  const [placing, setPlacing] = useState(false);

  const add = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          product,
          qty: item.qty,
          lineTotal: product.preco * item.qty,
        };
      })
      .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];
  }, [items, products]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines],
  );

  const checkoutWhatsAppUrl = useMemo(() => {
    if (lines.length === 0) {
      return whatsappUrl(
        contact.whatsapp,
        "Olá! Quero comprar na loja online da MUSIBRAS. Pode me ajudar?",
      );
    }
    const list = lines
      .map(
        (l) =>
          `• ${l.product.nome} (x${l.qty}) — ${formatPrice(l.lineTotal)}`,
      )
      .join("\n");
    const message = `Olá! Quero finalizar minha compra na MUSIBRAS:\n\n${list}\n\nTotal: ${formatPrice(total)}\n\nPode confirmar disponibilidade, frete e forma de pagamento?`;
    return whatsappUrl(contact.whatsapp, message);
  }, [lines, total, contact.whatsapp]);

  const placeOrder = useCallback(async () => {
    setPlacing(true);
    try {
      try {
        const order = await api.createOrder(items);
        const url = whatsappUrl(contact.whatsapp, order.whatsappMessage);
        return { order, whatsappUrl: url };
      } catch {
        // Sem API no host: monta a mensagem no cliente e abre o Zap.
        const list = lines
          .map(
            (l) =>
              `• ${l.product.nome} (x${l.qty}) — ${formatPrice(l.lineTotal)}`,
          )
          .join("\n");
        const whatsappMessage = `Olá! Quero finalizar minha compra na MUSIBRAS:\n\n${list}\n\nTotal: ${formatPrice(total)}\n\nPode confirmar disponibilidade, frete e forma de pagamento?`;
        const order = {
          id: `local_${Date.now().toString(36)}`,
          createdAt: new Date().toISOString(),
          items: lines.map((l) => ({
            productId: l.product.id,
            nome: l.product.nome,
            qty: l.qty,
            unitPrice: l.product.preco,
            lineTotal: l.lineTotal,
          })),
          total,
          totalLabel: formatPrice(total),
          status: "pending_whatsapp" as const,
          whatsappMessage,
        };
        return {
          order,
          whatsappUrl: whatsappUrl(contact.whatsapp, whatsappMessage),
        };
      }
    } finally {
      setPlacing(false);
    }
  }, [items, lines, total, contact.whatsapp]);

  const value: CartContextValue = {
    items,
    count,
    total,
    totalLabel: formatPrice(total),
    lines,
    add,
    remove,
    setQty,
    clear,
    checkoutWhatsAppUrl,
    placeOrder,
    placing,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
