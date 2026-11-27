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

## Editar WhatsApp / cidade

1. Variáveis de ambiente: `MUSIBRAS_WHATSAPP` (só dígitos, ex. `5511999999999`) e `MUSIBRAS_CIDADE`
2. Ou defaults em `server/app.ts` → rota `GET /api/contact`

## API

- `GET /api/health`
- `GET /api/categories` · `GET /api/categories/:id`
- `GET /api/products` · `GET /api/products/:slug`
- `POST /api/cart/quote`
- `POST /api/orders` · `GET /api/orders/:id`
- `GET /api/contact`
