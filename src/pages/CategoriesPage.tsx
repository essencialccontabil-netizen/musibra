import { Link } from "react-router-dom";
import { useCatalog } from "../api/CatalogContext";

export function CategoriesPage() {
  const { categories, products, loading, error, refresh } = useCatalog();

  if (loading || error) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>{loading ? "Carregando…" : "Erro na API"}</h2>
          {error && <p>{error}</p>}
          {error && (
            <button type="button" className="btn btn-primary" onClick={refresh}>
              Tentar de novo
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-hero">
          <span className="eyebrow">Categorias</span>
          <h1>Escolha o seu caminho</h1>
          <p>Toque em uma categoria para ver os produtos disponíveis.</p>
        </div>
        <div className="category-grid">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoriaId === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/categoria/${cat.id}`}
                className="category-card"
              >
                <img src={cat.imagem} alt="" loading="lazy" />
                <div className="body">
                  <h3>{cat.nome}</h3>
                  <p>
                    {cat.descricao} · {count}{" "}
                    {count === 1 ? "item" : "itens"}
                  </p>
                  <span className="linkish">Abrir categoria →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
