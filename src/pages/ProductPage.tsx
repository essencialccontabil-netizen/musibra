import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import type { Product } from "../api/types";
import { useCart } from "../cart/CartContext";
import { useCatalog } from "../api/CatalogContext";
import { ProductCard } from "../components/ProductCard";

export function ProductPage() {
  const { slug = "" } = useParams();
  const { add } = useCart();
  const { wa } = useCatalog();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .getProduct(slug)
      .then((data) => {
        if (cancelled) return;
        setProduct(data.product);
        setRelated(data.related);
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
  }, [slug]);

  if (loading) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Carregando produto…</h2>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h1>Produto não encontrado</h1>
          <p>{error}</p>
          <Link to="/catalogo" className="btn btn-primary">
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    );
  }

  const onAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="page-main">
      <div className="container">
        <nav className="crumbs">
          <Link to="/">Início</Link>
          <span>/</span>
          <Link to={`/categoria/${product.categoriaId}`}>{product.categoria}</Link>
          <span>/</span>
          <span>{product.nome}</span>
        </nav>

        <div className="pdp">
          <div className="pdp-media">
            <img src={product.imagem} alt={product.nome} />
            <div className="pdp-badge">{product.estoque}</div>
          </div>
          <div className="pdp-info">
            <span className="cat">{product.categoria}</span>
            <h1>{product.nome}</h1>
            <p className="pdp-price">{product.precoLabel}</p>
            <p className="pdp-summary">{product.resumo}</p>
            <p className="pdp-desc">{product.descricao}</p>

            <ul className="pdp-trust">
              <li>Atendimento da proprietária no WhatsApp</li>
              <li>Frete calculado na hora da compra</li>
              <li>Garantia da loja digital MUSIBRAS</li>
            </ul>

            <div className="pdp-actions">
              <button
                type="button"
                className={`btn btn-primary btn-lg${added ? " just-added" : ""}`}
                onClick={onAdd}
              >
                {added ? "Adicionado ✓" : "Adicionar ao carrinho"}
              </button>
              <a
                className="btn btn-secondary btn-lg wa-pulse"
                href={wa(
                  `Olá! Quero comprar: ${product.nome} (${product.precoLabel}). Pode confirmar disponibilidade e frete?`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Quero este no WhatsApp
              </a>
              <Link to="/carrinho" className="btn btn-ghost">
                Ver carrinho
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section" style={{ paddingInline: 0 }}>
            <div className="section-head">
              <span className="eyebrow">Combine com</span>
              <h2>Mais em {product.categoria}</h2>
            </div>
            <div className="plate-wall">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
