import { Link } from "react-router-dom";
import { useCatalog } from "../api/CatalogContext";
import { useCart } from "../cart/CartContext";
import { MusibrasLogo } from "../components/MusibrasLogo";

function plateNo(id: string): string {
  const n = Number(id.replace(/\D/g, "")) || 1;
  return String(n).padStart(2, "0");
}

export function HomePage() {
  const { categories, products, featured, contact, wa, loading, error, refresh } =
    useCatalog();
  const { add } = useCart();

  if (loading) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Abrindo o atelier…</h2>
          <p>Carregando catálogo pela API.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-main">
        <div className="container empty-state">
          <h2>Não foi possível carregar</h2>
          <p>{error}</p>
          <button type="button" className="btn btn-primary" onClick={refresh}>
            Tentar de novo
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden>
          <img
            src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=2000&q=85"
            alt=""
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-brand reveal">
            <MusibrasLogo
              variant="full"
              tone="light"
              className="hero-logo"
              title="MUSIBRAS"
            />
            <span className="visually-hidden">MUSIBRAS</span>
          </h1>
          <p className="hero-headline reveal reveal-delay-1">
            Atelier digital de instrumentos — compre online com curadoria da
            proprietária.
          </p>
          <p className="hero-line reveal reveal-delay-2">
            Catálogo com preços de referência, carrinho e contato por WhatsApp ou
            e-mail. Frete para todo o Brasil.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <Link to="/catalogo" className="btn btn-primary">
              Comprar agora
            </Link>
            <a
              className="btn btn-outline-light"
              href={wa()}
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </a>
            <a className="btn btn-outline-light" href={`mailto:${contact.email}`}>
              E-mail
            </a>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="container">
          <ul className="trust-list">
            <li>
              <strong>Atendimento da proprietária</strong>
              <span>Orientação real antes de fechar a compra</span>
            </li>
            <li>
              <strong>Envio para todo o Brasil</strong>
              <span>Embalagem reforçada · a partir de {contact.cidade}</span>
            </li>
            <li>
              <strong>Garantia da loja</strong>
              <span>Confiança na hora de investir no seu som</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="corridor-wrap">
        <div className="container section-head">
          <span className="eyebrow">Corredor do atelier</span>
          <h2>Escolha a família do instrumento</h2>
          <p>Deslize o corredor e entre na categoria — caminho direto ao produto.</p>
        </div>
        <div className="corridor" aria-label="Categorias">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/categoria/${cat.id}`}
              className="corridor-card"
            >
              <span className="plate-no">{String(i + 1).padStart(2, "0")}</span>
              <img src={cat.imagem} alt="" loading="lazy" />
              <div className="body">
                <h3>{cat.nome}</h3>
                <p>{cat.descricao}</p>
                <span className="linkish">Ver coleção →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guitar-row-section">
        <div className="container section-head">
          <span className="eyebrow">Cordas em fila</span>
          <h2>Guitarras enfileiradas</h2>
          <p>Várias opções lado a lado — fotos claras, preços de referência.</p>
        </div>
        <div className="guitar-row" aria-label="Guitarras">
          {products
            .filter(
              (p) =>
                p.slug.includes("guitarra") ||
                p.slug.includes("violao") ||
                p.slug.includes("contrabaixo"),
            )
            .slice(0, 6)
            .map((p) => (
              <Link
                key={p.id}
                to={`/produto/${p.slug}`}
                className="guitar-tile"
              >
                <img src={p.imagem} alt={p.nome} loading="lazy" />
                <span className="guitar-tile-name">{p.nome}</span>
                <span className="guitar-tile-price">{p.precoLabel}</span>
              </Link>
            ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container section-head">
          <span className="eyebrow">Peças em destaque</span>
          <h2>Seleção da proprietária</h2>
          <p>Preços à vista. Adicione ao carrinho ou fale no WhatsApp / e-mail.</p>
        </div>
        <div className="salon-list">
          {featured.slice(0, 5).map((p) => (
            <article key={p.id} className="salon-piece">
              <Link to={`/produto/${p.slug}`} className="salon-media">
                <img src={p.imagem} alt={p.nome} loading="lazy" />
              </Link>
              <div className="salon-copy">
                <div className="plate-no">Peça Nº {plateNo(p.id)}</div>
                <span className="cat">{p.categoria}</span>
                <h3>
                  <Link to={`/produto/${p.slug}`}>{p.nome}</Link>
                </h3>
                <p className="price">{p.precoLabel}</p>
                <p className="resumo">{p.resumo}</p>
                <div className="salon-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => add(p.id)}
                  >
                    Adicionar ao carrinho
                  </button>
                  <a
                    className="btn btn-secondary"
                    href={wa(
                      `Olá! Quero este: ${p.nome} (${p.precoLabel}). Pode confirmar e me passar o frete?`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enviar pedido no Zap
                  </a>
                  <Link to={`/produto/${p.slug}`} className="btn btn-ghost">
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div
          className="container"
          style={{ marginTop: "2.5rem", textAlign: "center" }}
        >
          <Link to="/catalogo" className="btn btn-secondary">
            Abrir catálogo completo
          </Link>
        </div>
      </section>

      <section className="section about">
        <div className="container about-grid">
          <div>
            <div className="section-head">
              <span className="eyebrow">A loja</span>
              <h2>Curadoria conduzida pela proprietária</h2>
            </div>
            <div className="about-copy">
              <p>
                A MUSIBRAS é uma loja digital: você navega o catálogo, monta o
                carrinho e finaliza no WhatsApp — com atendimento humano de quem
                escolhe cada peça.
              </p>
              <ul className="about-points">
                <li>Seleção pessoal de cada instrumento</li>
                <li>Orçamento de frete e parcelamento no WhatsApp</li>
                <li>Suporte pós-venda com quem vende de verdade</li>
              </ul>
              <div style={{ marginTop: "1.75rem" }}>
                <a
                  className="btn btn-primary"
                  href={wa(
                    "Olá! Quero uma indicação personalizada na loja online da MUSIBRAS.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Entrar em contato no Zap
                </a>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80"
              alt="Instrumentos na MUSIBRAS"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section contact">
        <div className="container">
          <div className="contact-panel">
            <div>
              <h2>Pronto para comprar?</h2>
              <p>
                Monte o pedido e fale conosco pelo WhatsApp (app ou Web) ou
                e-mail — fechamos disponibilidade, frete e pagamento com você.
              </p>
              <div className="contact-meta">
                <div>
                  <strong>WhatsApp</strong>
                  {contact.telefone}
                </div>
                <div>
                  <strong>E-mail</strong>
                  {contact.email}
                </div>
                <div>
                  <strong>Envio</strong>
                  A partir de {contact.cidade}
                </div>
                <div>
                  <strong>Endereço</strong>
                  {contact.endereco}
                </div>
              </div>
              <div className="contact-actions">
                <Link to="/carrinho" className="btn btn-primary">
                  Ir ao carrinho
                </Link>
                <a
                  className="btn btn-secondary wa-pulse"
                  href={wa()}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar no WhatsApp
                </a>
                <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
                  Escrever no e-mail
                </a>
              </div>
            </div>
            <aside className="contact-aside">
              <h3>Sem app obrigatório</h3>
              <p>
                No computador o WhatsApp abre no navegador (Web). Prefere e-mail?
                Use {contact.email} — mesmo atendimento humano.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
