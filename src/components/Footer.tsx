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
            {contact.nomeFantasia} · Envio a partir de {contact.cidade}
          </p>
          <p className="footer-note">
            {contact.razaoSocial}
            <br />
            CNPJ {contact.cnpj}
            <br />
            {contact.endereco}
          </p>
        </div>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrinho">Carrinho</Link>
          <a href={wa()} target="_blank" rel="noreferrer">
            Entrar em contato no Zap · {contact.telefone}
          </a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </footer>
  );
}
