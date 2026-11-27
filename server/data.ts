export {
  CATEGORIES,
  PRODUCTS,
  formatPrice,
} from "../src/data/catalog.js";

export type OrderItemInput = {
  productId: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: {
    productId: string;
    nome: string;
    qty: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  total: number;
  totalLabel: string;
  customerNote?: string;
  status: "pending_whatsapp" | "received";
  whatsappMessage: string;
  accessToken: string;
};

export const ORDERS: Order[] = [];
