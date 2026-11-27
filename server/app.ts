import { randomBytes } from "node:crypto";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  CATEGORIES,
  ORDERS,
  PRODUCTS,
  formatPrice,
  type Order,
  type OrderItemInput,
} from "./data.js";

const MAX_ORDER_LINES = 30;
const MAX_QTY_PER_LINE = 99;
const MAX_NOTE_LEN = 500;
const MAX_ORDERS_KEPT = 100;

const DEV_ORIGINS = new Set([
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:8787",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:8787",
]);

function isAllowedOrigin(origin: string, hostHeader: string | undefined): boolean {
  if (DEV_ORIGINS.has(origin)) return true;
  const configured = process.env.MUSIBRAS_CORS_ORIGIN;
  if (configured && origin === configured) return true;
  if (!hostHeader) return false;
  try {
    return new URL(origin).host === hostHeader;
  } catch {
    return false;
  }
}

function publicOrder(order: Order) {
  const { accessToken: _token, ...rest } = order;
  return rest;
}

export const app = new Hono();

app.use("*", async (c, next) => {
  const corsMiddleware = cors({
    origin: (origin) => {
      if (!origin) return "";
      return isAllowedOrigin(origin, c.req.header("host")) ? origin : "";
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "X-Order-Token"],
  });
  return corsMiddleware(c, next);
});

app.get("/api/health", (c) =>
  c.json({ ok: true, service: "musibras-api", version: "1" }),
);

app.get("/api/categories", (c) => c.json({ data: CATEGORIES }));

app.get("/api/categories/:id", (c) => {
  const category = CATEGORIES.find((item) => item.id === c.req.param("id"));
  if (!category) return c.json({ error: "Categoria não encontrada" }, 404);
  const products = PRODUCTS.filter((p) => p.categoriaId === category.id);
  return c.json({ data: { category, products } });
});

app.get("/api/products", (c) => {
  const categoria = c.req.query("categoria");
  const destaque = c.req.query("destaque");
  const q = (c.req.query("q") ?? "").trim().toLowerCase();

  let data = [...PRODUCTS];
  if (categoria) data = data.filter((p) => p.categoriaId === categoria);
  if (destaque === "1" || destaque === "true") {
    data = data.filter((p) => p.destaque);
  }
  if (q) {
    data = data.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q),
    );
  }
  return c.json({ data, meta: { count: data.length } });
});

app.get("/api/products/:slug", (c) => {
  const product = PRODUCTS.find((p) => p.slug === c.req.param("slug"));
  if (!product) return c.json({ error: "Produto não encontrado" }, 404);
  const related = PRODUCTS.filter(
    (p) => p.categoriaId === product.categoriaId && p.id !== product.id,
  ).slice(0, 3);
  return c.json({ data: { product, related } });
});

app.post("/api/cart/quote", async (c) => {
  const body = await c.req.json<{ items?: OrderItemInput[] }>().catch(() => null);
  const items = body?.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return c.json({ error: "Carrinho vazio" }, 400);
  }
  if (items.length > MAX_ORDER_LINES) {
    return c.json({ error: "Carrinho excede o limite de itens" }, 400);
  }

  const lines = [];
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (
      !product ||
      !item.qty ||
      item.qty < 1 ||
      item.qty > MAX_QTY_PER_LINE ||
      !Number.isFinite(item.qty)
    ) {
      return c.json({ error: `Item inválido: ${item.productId}` }, 400);
    }
    lines.push({
      productId: product.id,
      nome: product.nome,
      slug: product.slug,
      qty: item.qty,
      unitPrice: product.preco,
      lineTotal: product.preco * item.qty,
      precoLabel: product.precoLabel,
      imagem: product.imagem,
      estoque: product.estoque,
    });
  }

  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  return c.json({
    data: {
      lines,
      total,
      totalLabel: formatPrice(total),
      count: lines.reduce((sum, line) => sum + line.qty, 0),
    },
  });
});

app.post("/api/orders", async (c) => {
  const body = await c.req
    .json<{ items?: OrderItemInput[]; customerNote?: string }>()
    .catch(() => null);
  const items = body?.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return c.json({ error: "Pedido sem itens" }, 400);
  }
  if (items.length > MAX_ORDER_LINES) {
    return c.json({ error: "Pedido excede o limite de itens" }, 400);
  }

  const note =
    typeof body?.customerNote === "string" ? body.customerNote.trim() : "";
  if (note.length > MAX_NOTE_LEN) {
    return c.json({ error: "Observação muito longa" }, 400);
  }

  const orderItems = [];
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (
      !product ||
      !item.qty ||
      item.qty < 1 ||
      item.qty > MAX_QTY_PER_LINE ||
      !Number.isFinite(item.qty)
    ) {
      return c.json({ error: `Item inválido: ${item.productId}` }, 400);
    }
    orderItems.push({
      productId: product.id,
      nome: product.nome,
      qty: item.qty,
      unitPrice: product.preco,
      lineTotal: product.preco * item.qty,
    });
  }

  const total = orderItems.reduce((sum, line) => sum + line.lineTotal, 0);
  const list = orderItems
    .map((l) => `• ${l.nome} (x${l.qty}) — ${formatPrice(l.lineTotal)}`)
    .join("\n");
  const whatsappMessage = `Olá! Quero finalizar minha compra na MUSIBRAS:\n\n${list}\n\nTotal: ${formatPrice(total)}\n\nPode confirmar disponibilidade, frete e forma de pagamento?`;

  const accessToken = randomBytes(24).toString("hex");
  const order: Order = {
    id: `ord_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    items: orderItems,
    total,
    totalLabel: formatPrice(total),
    customerNote: note || undefined,
    status: "pending_whatsapp",
    whatsappMessage,
    accessToken,
  };
  ORDERS.unshift(order);
  if (ORDERS.length > MAX_ORDERS_KEPT) {
    ORDERS.length = MAX_ORDERS_KEPT;
  }
  return c.json({ data: order }, 201);
});

app.get("/api/orders/:id", (c) => {
  const order = ORDERS.find((o) => o.id === c.req.param("id"));
  if (!order) return c.json({ error: "Pedido não encontrado" }, 404);
  const token =
    c.req.query("token") ?? c.req.header("X-Order-Token") ?? undefined;
  if (!token || token !== order.accessToken) {
    return c.json({ error: "Pedido não encontrado" }, 404);
  }
  return c.json({ data: publicOrder(order) });
});

app.get("/api/contact", (c) =>
  c.json({
    data: {
      whatsapp: process.env.MUSIBRAS_WHATSAPP ?? "5511999999999",
      cidade: process.env.MUSIBRAS_CIDADE ?? "São Paulo, SP",
      mensagemPadrao:
        "Olá! Vim pela loja online da MUSIBRAS e quero finalizar uma compra.",
    },
  }),
);
