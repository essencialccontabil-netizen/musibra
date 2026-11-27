import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";

export function StickyCta() {
  const { count, totalLabel, checkoutWhatsAppUrl } = useCart();

  if (count === 0) {
    return (
      <div className="sticky-cta">
        <div className="container">
          <div>
            <strong>Loja online MUSIBRAS</strong>
            <p className="hint">Escolha um instrumento e finalize no WhatsApp</p>
          </div>
          <Link to="/catalogo" className="btn btn-primary">
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky-cta">
      <div className="container">
        <div>
          <strong>
            {count} {count === 1 ? "item" : "itens"} · {totalLabel}
          </strong>
          <p className="hint">Pronto para fechar no WhatsApp</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <Link to="/carrinho" className="btn btn-outline-light btn-sm">
            Carrinho
          </Link>
          <a
            className="btn btn-primary"
            href={checkoutWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
          >
            Finalizar compra
          </a>
        </div>
      </div>
    </div>
  );
}
