export type Category = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
};

export type Product = {
  id: string;
  slug: string;
  nome: string;
  categoriaId: string;
  categoria: string;
  preco: number;
  precoLabel: string;
  resumo: string;
  descricao: string;
  destaque: boolean;
  estoque: "pronta entrega" | "sob encomenda" | "últimas unidades";
  imagem: string;
};

export type ContactInfo = {
  whatsapp: string;
  cidade: string;
  mensagemPadrao: string;
};

export type CartItemInput = {
  productId: string;
  qty: number;
};

export type QuoteLine = {
  productId: string;
  nome: string;
  slug: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  precoLabel: string;
  imagem: string;
  estoque: Product["estoque"];
};

export type CartQuote = {
  lines: QuoteLine[];
  total: number;
  totalLabel: string;
  count: number;
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
};
