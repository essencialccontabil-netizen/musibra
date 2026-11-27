import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, whatsappUrl } from "./client";
import type { Category, ContactInfo, Product } from "./types";

type CatalogState = {
  loading: boolean;
  error: string | null;
  categories: Category[];
  products: Product[];
  featured: Product[];
  contact: ContactInfo;
  wa: (message?: string) => string;
  refresh: () => void;
};

const defaultContact: ContactInfo = {
  whatsapp: "5511999999999",
  cidade: "São Paulo, SP",
  mensagemPadrao:
    "Olá! Vim pela loja online da MUSIBRAS e quero finalizar uma compra.",
};

const CatalogContext = createContext<CatalogState | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([api.getCategories(), api.getProducts(), api.getContact()])
      .then(([cats, prods, contactInfo]) => {
        if (cancelled) return;
        setCategories(cats);
        setProducts(prods);
        setContact(contactInfo);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || "Falha ao carregar a loja");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const value = useMemo<CatalogState>(
    () => ({
      loading,
      error,
      categories,
      products,
      featured: products.filter((p) => p.destaque),
      contact,
      wa: (message) =>
        whatsappUrl(contact.whatsapp, message ?? contact.mensagemPadrao),
      refresh: () => setTick((t) => t + 1),
    }),
    [loading, error, categories, products, contact],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogState {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
