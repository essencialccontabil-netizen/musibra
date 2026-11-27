import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCatalog } from "../api/CatalogContext";
import { ProductCard } from "../components/ProductCard";

export function CategoryPage() {
  const { id = "" } = useParams();
  const { categories, products, loading } = useCatalog();

  const category = useMemo(
    () => categories.find((c) => c.id === id) ?? null,
    [categories, id],
  );
  const categoryProducts = useMemo(
    () => products.filter((p) => p.categoriaId === id),
    [products, id],
  );

  if (loading) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Carregando categoria…</h2>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h1>Categoria não encontrada</h1>
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
          {categoryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
