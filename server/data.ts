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
};

function brl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export const CATEGORIES: Category[] = [
  {
    id: "pianos",
    nome: "Pianos",
    descricao: "Acústicos e digitais com entrega e montagem",
    imagem:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cordas",
    nome: "Cordas",
    descricao: "Violões, guitarras e instrumentos de arco",
    imagem:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "teclas",
    nome: "Teclas",
    descricao: "Teclados e sintetizadores prontos para envio",
    imagem:
      "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "percussao",
    nome: "Percussão",
    descricao: "Baterias e ritmo para home studio e palco",
    imagem:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sopro",
    nome: "Sopro",
    descricao: "Sopros e metais com garantia da loja",
    imagem:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35deb4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "acessorios",
    nome: "Acessórios",
    descricao: "Cabos, estantes, cases e cuidados",
    imagem:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "piano-vertical-nogueira",
    nome: "Piano Vertical Nogueira",
    categoriaId: "pianos",
    categoria: "Pianos",
    preco: 18900,
    precoLabel: brl(18900),
    resumo: "Acabamento em nogueira, afinação inclusa na entrega.",
    descricao:
      "Piano vertical com sonoridade equilibrada para estudo e performance em casa. Inclui afinação inicial e orientação da proprietária para posicionamento e cuidado.",
    destaque: true,
    estoque: "sob encomenda",
    imagem:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p2",
    slug: "piano-digital-88-marfim",
    nome: "Piano Digital 88 Marfim",
    categoriaId: "pianos",
    categoria: "Pianos",
    preco: 6290,
    precoLabel: brl(6290),
    resumo: "Teclas ponderadas, Bluetooth e suporte incluso.",
    descricao:
      "Ideal para apartamento: 88 teclas ponderadas, timbres premium e conexão Bluetooth. Envio protegido com garantia da loja.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p3",
    slug: "violao-classico-cedro",
    nome: "Violão Clássico Cedro",
    categoriaId: "cordas",
    categoria: "Cordas",
    preco: 2490,
    precoLabel: brl(2490),
    resumo: "Tampo em cedro, ação confortável para estudo.",
    descricao:
      "Violão clássico com tampo em cedro e laterais selecionadas. Pronto para envio com capa e set de cordas reserva.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p4",
    slug: "guitarra-semi-acustica",
    nome: "Guitarra Semi-Acústica",
    categoriaId: "cordas",
    categoria: "Cordas",
    preco: 3890,
    precoLabel: brl(3890),
    resumo: "Corpo semi-oco, versátil para jazz e blues.",
    descricao:
      "Semi-acústica com timbre quente e definição. Inclui case rígido sob consulta e setup inicial antes do envio.",
    destaque: true,
    estoque: "últimas unidades",
    imagem:
      "https://images.unsplash.com/photo-1556449895-a33c06b3552a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p5",
    slug: "violino-estudante-pro",
    nome: "Violino Estudante Pro",
    categoriaId: "cordas",
    categoria: "Cordas",
    preco: 1790,
    precoLabel: brl(1790),
    resumo: "Kit completo: arco, breu e estojo.",
    descricao:
      "Kit de violino para quem está começando com qualidade de verdade. Ajustado na loja antes de seguir para o seu endereço.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1612225330812-01a9c2b7dd84?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p6",
    slug: "teclado-arranjador-61",
    nome: "Teclado Arranjador 61",
    categoriaId: "teclas",
    categoria: "Teclas",
    preco: 3250,
    precoLabel: brl(3250),
    resumo: "Centenas de ritmos e USB para gravar.",
    descricao:
      "Arranjador completo para ensaio, igreja e shows. Envio com fonte e pedal; suporte da proprietária no primeiro uso.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p7",
    slug: "bateria-acustica-maple",
    nome: "Bateria Acústica Maple",
    categoriaId: "percussao",
    categoria: "Percussão",
    preco: 5790,
    precoLabel: brl(5790),
    resumo: "Shell maple, ferragens incluídas.",
    descricao:
      "Kit maple com pedais e bancos. Embalagem reforçada para frete; montagem orientada por vídeo se preferir.",
    destaque: true,
    estoque: "sob encomenda",
    imagem:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47e7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p8",
    slug: "caixa-snare-14",
    nome: 'Caixa Snare 14"',
    categoriaId: "percussao",
    categoria: "Percussão",
    preco: 890,
    precoLabel: brl(890),
    resumo: "Resposta rápida, ideal para upgrade.",
    descricao:
      "Snare 14\" com cordal preciso. Envio rápido e garantia da MUSIBRAS.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1571327073757-71d13c24de30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p9",
    slug: "saxofone-alto",
    nome: "Saxofone Alto",
    categoriaId: "sopro",
    categoria: "Sopro",
    preco: 6120,
    precoLabel: brl(6120),
    resumo: "Acabamento laqueado, case e bocal.",
    descricao:
      "Sax alto laqueado com case e acessórios. Revisado antes do envio; parcelamento sob consulta no WhatsApp.",
    destaque: true,
    estoque: "últimas unidades",
    imagem:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35deb4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p10",
    slug: "flauta-transversal",
    nome: "Flauta Transversal Níquel",
    categoriaId: "sopro",
    categoria: "Sopro",
    preco: 1450,
    precoLabel: brl(1450),
    resumo: "Leve, afinada e pronta para aula.",
    descricao:
      "Flauta transversal em níquel com estojo rígido. Ideal para estudantes — envio em 24–48h úteis.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1576220258794-9b9c6d4d6f6a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p11",
    slug: "kit-cabos-premium",
    nome: "Kit Cabos Premium",
    categoriaId: "acessorios",
    categoria: "Acessórios",
    preco: 189,
    precoLabel: brl(189),
    resumo: "2 cabos instrument + 1 cabo de microfone.",
    descricao:
      "Kit essencial para ensaio e gravação. Frete econômico e estoque renovado toda semana.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p12",
    slug: "case-guitarra-rigido",
    nome: "Case Rígido para Guitarra",
    categoriaId: "acessorios",
    categoria: "Acessórios",
    preco: 520,
    precoLabel: brl(520),
    resumo: "Proteção total para envios e viagens.",
    descricao:
      "Case rígido acolchoado, trava reforçada. Combine com sua guitarra no carrinho e feche no WhatsApp.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=1200&q=80",
  },
];

export const ORDERS: Order[] = [];

export function formatPrice(value: number): string {
  return brl(value);
}
