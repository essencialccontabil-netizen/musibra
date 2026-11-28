# MUSIBRAS — loja digital

Atelier online de instrumentos (pt-BR): catálogo + carrinho + checkout WhatsApp, com API Hono.

## Desenvolvimento

```bash
npm install
npm run dev
```

- Web: http://127.0.0.1:5173 (proxy `/api` → API)
- API: http://127.0.0.1:8787

## Produção local

```bash
npm run build
npm start
```

Serve `dist/` + API na porta `PORT` (padrão 8787).

## Contato / empresa

Defaults (CNPJ Musical Brasília): WhatsApp `556193118261`, Brasília-DF.

Override via env: `MUSIBRAS_WHATSAPP`, `MUSIBRAS_CIDADE`, `MUSIBRAS_ENDERECO`, `MUSIBRAS_CNPJ`, `MUSIBRAS_EMAIL`, etc. — ou em `server/app.ts` → `GET /api/contact`.

## API

- `GET /api/health`
- `GET /api/categories` · `GET /api/categories/:id`
- `GET /api/products` · `GET /api/products/:slug`
- `POST /api/cart/quote`
- `POST /api/orders` · `GET /api/orders/:id`
- `GET /api/contact`
