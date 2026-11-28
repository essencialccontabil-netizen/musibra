import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useCatalog } from "../api/CatalogContext";
import { MusibrasLogo } from "./MusibrasLogo";

export function Nav() {
  const { count } = useCart();
  const { wa, contact } = useCatalog();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Link
          to="/"
          className="nav-brand"
          onClick={() => setOpen(false)}
          aria-label="MUSIBRAS — início"
        >
          <MusibrasLogo variant="full" className="nav-logo" />
        </Link>

        <ul className={`nav-links${open ? " open" : ""}`}>
          <li>
            <NavLink to="/catalogo" onClick={() => setOpen(false)}>
              Catálogo
            </NavLink>
          </li>
          <li>
            <NavLink to="/categorias" onClick={() => setOpen(false)}>
              Categorias
            </NavLink>
          </li>
          <li>
            <NavLink to="/carrinho" onClick={() => setOpen(false)}>
              Carrinho{count > 0 ? ` (${count})` : ""}
            </NavLink>
          </li>
          <li>
            <a
              href={wa()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Contato no Zap
            </a>
          </li>
        </ul>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link to="/carrinho" className="btn btn-secondary btn-sm nav-cta">
            Carrinho{count > 0 ? ` · ${count}` : ""}
          </Link>
          <a
            className="btn btn-primary btn-sm"
            href={wa(
              `Olá! Quero comprar na MUSIBRAS (envio para ${contact.cidade}).`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            Entrar em contato no Zap
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
