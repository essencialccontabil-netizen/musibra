/**
 * Dados de contato / empresa também vêm da API em GET /api/contact.
 * Fonte: Comprovante CNPJ + WhatsApp informado pelo cliente.
 * Override via env no servidor (MUSIBRAS_WHATSAPP, MUSIBRAS_CIDADE, etc.).
 */
export const CONTACT_PLACEHOLDERS = {
  whatsapp: "556193118261",
  telefone: "(61) 9311-8261",
  cidade: "Brasília, DF",
  endereco: "Q CRS 511 Bloco C Loja 51, Asa Sul, Brasília - DF, CEP 70.361-500",
  cnpj: "41.651.974/0001-12",
  razaoSocial: "MUSICAL BRASILIA INSTRUMENTOS MUSICAIS LTDA",
  nomeFantasia: "MUSICAL BRASILIA",
  email: "musicalbrasilia@gmail.com",
} as const;
