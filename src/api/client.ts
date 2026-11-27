import type {
  CartItemInput,
  CartQuote,
  Category,
  ContactInfo,
  Order,
  Product,
} from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as { error?: string }).error ?? `API error ${res.status}`,
    );
  }
  return json as T;
}

export const api = {
  health: () => request<{ ok: boolean }>("/api/health"),

  getContact: () =>
    request<{ data: ContactInfo }>("/api/contact").then((r) => r.data),

  getCategories: () =>
    request<{ data: Category[] }>("/api/categories").then((r) => r.data),

  getCategory: (id: string) =>
    request<{ data: { category: Category; products: Product[] } }>(
      `/api/categories/${id}`,
    ).then((r) => r.data),

  getProducts: (params?: {
    categoria?: string;
    destaque?: boolean;
    q?: string;
  }) => {
    const qs = new URLSearchParams();
    if (params?.categoria) qs.set("categoria", params.categoria);
    if (params?.destaque) qs.set("destaque", "1");
    if (params?.q) qs.set("q", params.q);
    const suffix = qs.toString() ? `?${qs}` : "";
    return request<{ data: Product[]; meta: { count: number } }>(
      `/api/products${suffix}`,
    ).then((r) => r.data);
  },

  getProduct: (slug: string) =>
    request<{ data: { product: Product; related: Product[] } }>(
      `/api/products/${slug}`,
    ).then((r) => r.data),

  quoteCart: (items: CartItemInput[]) =>
    request<{ data: CartQuote }>("/api/cart/quote", {
      method: "POST",
      body: JSON.stringify({ items }),
    }).then((r) => r.data),

  createOrder: (items: CartItemInput[], customerNote?: string) =>
    request<{ data: Order }>("/api/orders", {
      method: "POST",
      body: JSON.stringify({ items, customerNote }),
    }).then((r) => r.data),

  getOrder: (id: string) =>
    request<{ data: Order }>(`/api/orders/${id}`).then((r) => r.data),
};

export function whatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
