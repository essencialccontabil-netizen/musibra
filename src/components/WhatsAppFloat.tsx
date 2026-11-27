const WA_URL =
  "https://wa.me/556193118261?text=" +
  encodeURIComponent(
    "Olá! Vim pela loja online da MUSIBRAS e quero finalizar uma compra.",
  );

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={WA_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Entrar em contato no WhatsApp"
      title="WhatsApp MUSIBRAS"
    >
      <span className="wa-float-pulse" aria-hidden="true" />
      <svg
        className="wa-float-icon"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.3 4 14.82c0 2.1.56 4.14 1.62 5.95L4 29l8.45-2.2a12.2 12.2 0 0 0 3.59.54h.01C22.68 27.34 28 22.04 28 15.52 28 8.3 22.68 3 16.04 3zm6.94 17.45c-.29.8-1.68 1.48-2.35 1.56-.6.07-1.36.1-2.2-.14-.5-.14-1.15-.31-1.98-.6-3.48-1.5-5.74-4.97-5.91-5.2-.17-.23-1.4-1.86-1.4-3.55s.88-2.52 1.2-2.86c.31-.34.68-.43.91-.43h.66c.21 0 .5-.08.78.6.29.7.98 2.4 1.07 2.57.09.17.14.37.03.6-.11.23-.17.37-.34.57-.17.2-.36.44-.51.59-.17.17-.34.35-.15.68.2.34.88 1.45 1.88 2.35 1.3 1.16 2.39 1.52 2.73 1.69.34.17.54.14.74-.09.2-.23.85-.99 1.08-1.33.23-.34.45-.28.76-.17.31.11 1.97.93 2.31 1.1.34.17.57.26.65.4.09.14.09.8-.2 1.6z"
        />
      </svg>
    </a>
  );
}
