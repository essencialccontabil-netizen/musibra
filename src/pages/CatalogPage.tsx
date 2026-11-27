import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCatalog } from "../api/CatalogContext";
import { ProductCard } from "../components/ProductCard";

export function CatalogPage() {
  const { categories, products, loading, error, refresh } = useCatalog();
  const [cat, setCat] = useState<string>("todos");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const byCat = cat === "todos" || p.categoriaId === cat;
      const query = q.trim().toLowerCase();
      const byQ =
        !query ||
        p.nome.toLowerCase().includes(query) ||
        p.categoria.toLowerCase().includes(query);
      return byCat && byQ;
    });
  }, [cat, q, products]);

  if (loading) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Carregando catálogo…</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Erro na API</h2>
          <p>{error}</p>
          <button type="button" className="btn btn-primary" onClick={refresh}>
            Tentar de novo
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-hero">
          <span className="eyebrow">Catálogo online</span>
          <h1>Todos os instrumentos</h1>
          <p>Dados via API · filtre, compare e adicione ao carrinho.</p>
        </div>

        <div className="catalog-toolbar">
          <input
            type="search"
            className="catalog-search"
            placeholder="Buscar instrumento…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Buscar no catálogo"
          />
          <div className="catalog-filters" role="tablist" aria-label="Categorias">
            <button
              type="button"
              className={`chip${cat === "todos" ? " active" : ""}`}
              onClick={() => setCat("todos")}
            >
              Todos
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip${cat === c.id ? " active" : ""}`}
                onClick={() => setCat(c.id)}
              >
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        <p className="catalog-count">
          {filtered.length}{" "}
          {filtered.length === 1 ? "produto" : "produtos"}
          {" · "}
          <Link to="/categorias">ver por categoria</Link>
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h2>Nada encontrado</h2>
            <p>Tente outro termo ou limpe o filtro.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setQ("");
                setCat("todos");
              }}
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="plate-wall">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
