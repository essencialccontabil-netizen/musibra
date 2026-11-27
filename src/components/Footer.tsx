import { Link } from "react-router-dom";
import { useCatalog } from "../api/CatalogContext";

export function Footer() {
  const { contact, wa } = useCatalog();
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div>
          <div className="footer-brand">MUSIBRAS</div>
          <p className="footer-note">
            Loja digital de instrumentos · Envio a partir de {contact.cidade}
          </p>
        </div>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrinho">Carrinho</Link>
          <a href={wa()} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
