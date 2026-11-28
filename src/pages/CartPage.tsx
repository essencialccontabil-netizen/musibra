import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { openWhatsApp } from "../api/client";
import { useCatalog } from "../api/CatalogContext";

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function CartPage() {
  const {
    lines,
    count,
    totalLabel,
    setQty,
    remove,
    clear,
    placeOrder,
    placing,
  } = useCart();
  const { contact, wa } = useCatalog();
  const [orderError, setOrderError] = useState<string | null>(null);

  const onCheckout = async () => {
    setOrderError(null);
    try {
      const { whatsappUrl } = await placeOrder();
      openWhatsApp(whatsappUrl);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Falha ao criar pedido");
    }
  };

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-hero">
          <span className="eyebrow">Carrinho</span>
          <h1>Sua seleção</h1>
          <p>
            Revise os itens e envie o pedido pelo WhatsApp (app ou Web) ou por
            e-mail — preços de referência, confirmamos tudo no atendimento.
          </p>
        </div>

        {count === 0 ? (
          <div className="empty-state">
            <h2>Carrinho vazio</h2>
            <p>Explore o catálogo e adicione o que deseja comprar.</p>
            <Link to="/catalogo" className="btn btn-primary">
              Ir ao catálogo
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-lines">
              {lines.map(({ product, qty, lineTotal }) => (
                <article key={product.id} className="cart-line">
                  <Link to={`/produto/${product.slug}`} className="thumb">
                    <img src={product.imagem} alt="" />
                  </Link>
                  <div className="meta">
                    <h3>
                      <Link to={`/produto/${product.slug}`}>{product.nome}</Link>
                    </h3>
                    <p>
                      {product.precoLabel} · {product.estoque}
                    </p>
                    <div className="qty-row">
                      <button
                        type="button"
                        aria-label="Diminuir"
                        onClick={() => setQty(product.id, qty - 1)}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() => setQty(product.id, qty + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="remove"
                        onClick={() => remove(product.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  <div className="line-total">{formatPrice(lineTotal)}</div>
                </article>
              ))}
              <button type="button" className="btn btn-ghost btn-sm" onClick={clear}>
                Limpar carrinho
              </button>
            </div>

            <aside className="cart-summary">
              <h2>Resumo</h2>
              <div className="summary-row">
                <span>
                  {count} {count === 1 ? "item" : "itens"}
                </span>
                <strong>{totalLabel}</strong>
              </div>
              <p className="summary-note">
                Frete e pagamento no atendimento · Envio a partir de{" "}
                {contact.cidade}
              </p>
              {orderError && (
                <p className="summary-note" style={{ color: "#f2b8c0" }}>
                  {orderError}
                </p>
              )}
              <button
                type="button"
                className="btn btn-primary btn-block btn-lg wa-pulse"
                onClick={onCheckout}
                disabled={placing}
              >
                {placing ? "Enviando…" : "Enviar pedido no WhatsApp"}
              </button>
              <a
                className="btn btn-ghost btn-block"
                href={wa(
                  "Olá! Quero um orçamento com frete antes de fechar a compra na MUSIBRAS.",
                )}
                target="_blank"
                rel="noreferrer"
              >
                Falar no WhatsApp (app ou Web)
              </a>
              <a
                className="btn btn-secondary btn-block"
                href={`mailto:${contact.email}?subject=${encodeURIComponent("Pedido MUSIBRAS")}&body=${encodeURIComponent(
                  `Olá! Quero finalizar um pedido na MUSIBRAS.\n\nItens:\n${lines
                    .map(
                      ({ product, qty }) =>
                        `• ${product.nome} × ${qty} — ${product.precoLabel}`,
                    )
                    .join("\n")}\n\nTotal: ${totalLabel}\n\nPode confirmar disponibilidade e frete?`,
                )}`}
              >
                Enviar pedido por e-mail
              </a>
              <Link to="/catalogo" className="btn btn-ghost btn-block">
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
