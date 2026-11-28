import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../api/types";
import { useCart } from "../cart/CartContext";
import { useCatalog } from "../api/CatalogContext";

function plateNo(id: string): string {
  const n = Number(id.replace(/\D/g, "")) || 1;
  return String(n).padStart(2, "0");
}

function stockLabel(estoque: Product["estoque"]): string {
  if (estoque === "últimas unidades") return "Últimas unidades";
  if (estoque === "pronta entrega") return "Pronta entrega";
  return "Sob encomenda";
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { wa } = useCatalog();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-plate">
      <Link to={`/produto/${product.slug}`} className="media">
        <span className="plate-no">Nº {plateNo(product.id)}</span>
        <img src={product.imagem} alt={product.nome} loading="lazy" />
      </Link>
      <div className="body">
        <span className="cat">{product.categoria}</span>
        <h3>
          <Link to={`/produto/${product.slug}`}>{product.nome}</Link>
        </h3>
        <p className="price">{product.precoLabel}</p>
        <p className="stock">{stockLabel(product.estoque)}</p>
        <div className="actions">
          <button
            type="button"
            className={`btn btn-primary btn-sm btn-block${added ? " just-added" : ""}`}
            onClick={onAdd}
          >
            {added ? "No carrinho ✓" : "Adicionar ao carrinho"}
          </button>
          <a
            className="btn btn-ghost btn-sm btn-block"
            href={wa(
              `Olá! Quero este: ${product.nome} (${product.precoLabel}). Pode confirmar e me passar o frete?`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            Enviar pedido no Zap
          </a>
        </div>
      </div>
    </article>
  );
}
