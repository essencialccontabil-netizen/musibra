import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import type { Category, Product } from "../api/types";
import { ProductCard } from "../components/ProductCard";

export function CategoryPage() {
  const { id = "" } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .getCategory(id)
      .then((data) => {
        if (cancelled) return;
        setCategory(data.category);
        setProducts(data.products);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Carregando categoria…</h2>
        </div>
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h1>Categoria não encontrada</h1>
          <p>{error}</p>
          <Link to="/categorias" className="btn btn-primary">
            Ver categorias
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-hero">
          <span className="eyebrow">Categoria</span>
          <h1>{category.nome}</h1>
          <p>{category.descricao}</p>
          <p style={{ marginTop: "0.75rem" }}>
            <Link to="/categorias">← Todas as categorias</Link>
            {" · "}
            <Link to="/catalogo">Catálogo completo</Link>
          </p>
        </div>
        <div className="plate-wall">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
