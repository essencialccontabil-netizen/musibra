import type { Category, Product } from "../api/types";

function brl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatPrice(value: number): string {
  return brl(value);
}

/** Preços de referência para visão do catálogo — ajustáveis por cliente. */
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
    descricao: "Violões, guitarras, viola, violino e baixo",
    imagem:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "teclas",
    nome: "Teclas",
    descricao: "Teclados, sintetizadores e sanfonas",
    imagem:
      "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "percussao",
    nome: "Percussão",
    descricao: "Baterias, pandeiros, tantã e ritmo",
    imagem:
      "https://images.unsplash.com/photo-1571327073757-71d13c24de30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sopro",
    nome: "Sopro",
    descricao: "Sax, flauta, trompete, gaita e metais",
    imagem:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
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
      "Piano vertical com sonoridade equilibrada para estudo e performance em casa. Preço de referência — confirme disponibilidade e frete no atendimento.",
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
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p13",
    slug: "guitarra-eletrica-strat",
    nome: "Guitarra Elétrica Strat",
    categoriaId: "cordas",
    categoria: "Cordas",
    preco: 2790,
    precoLabel: brl(2790),
    resumo: "Três single-coils, braço maple, pronta para palco.",
    descricao:
      "Guitarra estilo Strat com timbre clássico rock/pop. Setup na loja; preço de referência sujeito a confirmação.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1460036521480-ff49c08c2781?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p14",
    slug: "viola-arco-intermediaria",
    nome: "Viola de Arco Intermediária",
    categoriaId: "cordas",
    categoria: "Cordas",
    preco: 2890,
    precoLabel: brl(2890),
    resumo: "Tamanho 16\", arco e estojo inclusos.",
    descricao:
      "Viola com sonoridade equilibrada para orquestra e estudo avançado. Preço ilustrativo do catálogo online.",
    destaque: true,
    estoque: "sob encomenda",
    imagem:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p15",
    slug: "contrabaixo-eletrico-4",
    nome: "Contrabaixo Elétrico 4 Cordas",
    categoriaId: "cordas",
    categoria: "Cordas",
    preco: 3190,
    precoLabel: brl(3190),
    resumo: "Corpo alder, captadores ativos opcionais.",
    descricao:
      "Baixo versátil para banda e estúdio. Frete e parcelamento sob consulta no atendimento.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1556449895-a33c06b380fa?auto=format&fit=crop&w=1200&q=80",
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
      "Arranjador completo para ensaio, igreja e shows. Envio com fonte e pedal; suporte no primeiro uso.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p16",
    slug: "sanfona-8-baixos",
    nome: "Sanfona 8 Baixos",
    categoriaId: "teclas",
    categoria: "Teclas",
    preco: 4590,
    precoLabel: brl(4590),
    resumo: "Acordeão compacto para forró e folclore.",
    descricao:
      "Sanfona 8 baixos com case acolchoado. Ideal para quem quer começar no forró com instrumento sério — preço de referência.",
    destaque: true,
    estoque: "sob encomenda",
    imagem:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1461784180009-21121b2f204c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p17",
    slug: "bateria-eletronica-mesh",
    nome: "Bateria Eletrônica Mesh",
    categoriaId: "percussao",
    categoria: "Percussão",
    preco: 4290,
    precoLabel: brl(4290),
    resumo: "Pads mesh silenciosos, módulo com kits.",
    descricao:
      "Perfeita para apartamento: resposta natural e fone incluso. Catálogo com preço ilustrativo.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80",
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
    id: "p18",
    slug: "pandeiro-10-profissional",
    nome: 'Pandeiro 10" Profissional',
    categoriaId: "percussao",
    categoria: "Percussão",
    preco: 420,
    precoLabel: brl(420),
    resumo: "Pele animal, platinelas secas — samba e choro.",
    descricao:
      "Pandeiro profissional 10\" para roda e ensaio. Preço de referência do catálogo.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p19",
    slug: "tantan-14-madeira",
    nome: 'Tantã 14" Madeira',
    categoriaId: "percussao",
    categoria: "Percussão",
    preco: 680,
    precoLabel: brl(680),
    resumo: "Corpo em madeira, pele afinável.",
    descricao:
      "Tantã para samba e batucada. Leve e com boa projeção — confirme estoque no atendimento.",
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
      "Sax alto laqueado com case e acessórios. Revisado antes do envio; parcelamento sob consulta.",
    destaque: true,
    estoque: "últimas unidades",
    imagem:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p20",
    slug: "saxofone-tenor",
    nome: "Saxofone Tenor",
    categoriaId: "sopro",
    categoria: "Sopro",
    preco: 7890,
    precoLabel: brl(7890),
    resumo: "Timbre encorpado, case rígido incluso.",
    descricao:
      "Sax tenor para jazz, gospel e banda. Preço ilustrativo — confirme modelo e acabamento.",
    destaque: true,
    estoque: "sob encomenda",
    imagem:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p21",
    slug: "trompete-sib-laqueado",
    nome: "Trompete Sib Laqueado",
    categoriaId: "sopro",
    categoria: "Sopro",
    preco: 2680,
    precoLabel: brl(2680),
    resumo: "Bocal e case — escola de música e banda.",
    descricao:
      "Trompete em Sib com acabamento laqueado. Preço de referência do catálogo online.",
    destaque: true,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p22",
    slug: "gaita-diatonica-c",
    nome: "Gaita Diatônica em C",
    categoriaId: "sopro",
    categoria: "Sopro",
    preco: 189,
    precoLabel: brl(189),
    resumo: "10 furos, blues e folk.",
    descricao:
      "Gaita diatônica em Dó, compacta e afinada. Ótima porta de entrada — preço ilustrativo.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
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
      "Case rígido acolchoado, trava reforçada. Combine com sua guitarra no carrinho.",
    destaque: false,
    estoque: "pronta entrega",
    imagem:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=1200&q=80",
  },
];
