type MusibrasLogoProps = {
  variant?: "full" | "mark" | "wordmark";
  tone?: "ink" | "light";
  className?: string;
  title?: string;
};

/** Logo MUSIBRAS — contraste suave, ainda legível. */
export function MusibrasLogo({
  variant = "full",
  tone = "ink",
  className = "",
  title = "MUSIBRAS",
}: MusibrasLogoProps) {
  const isLight = tone === "light";
  // Soft cream / walnut — readable without harsh black/white punch
  const ink = isLight ? "#F7F0E4" : "#2E2118";
  const brass = isLight ? "#E2C79A" : "#9A7A4A";
  const markBg = isLight ? "rgba(247, 240, 228, 0.92)" : "#2E2118";
  const markGlyph = isLight ? "#8B4A52" : "#D4BF96";
  const markRing = isLight ? "#E2C79A" : "#C4A574";

  const mark = (
    <g aria-hidden="true">
      <rect x="1" y="1" width="62" height="62" rx="14" fill={markBg} />
      <rect
        x="5"
        y="5"
        width="54"
        height="54"
        rx="11"
        stroke={markRing}
        strokeWidth="1.6"
        fill="none"
        opacity="0.95"
      />
      <path
        d="M32 12c-6.4 1-11 6-11 12.4 0 4.8 2.9 8.4 7.2 10.1-1.1 2.4-1.6 5-1.6 7.6 0 7.7 5.6 13.3 12.5 13.3s12.5-5.6 12.5-13.3c0-2.9-.7-5.6-1.9-8 3.7-1.9 6.2-5.5 6.2-9.7 0-6.5-5.1-11.2-11.9-11.5V12.4c-.6-.1-1.3-.2-1.9-.2l-.9-.1v5.6c3.5.3 5.9 2.5 5.9 5.4 0 3-2.5 5.3-6 5.3h-.6V19.6c0-.7-.5-1.2-1.2-1.2h-2.1c-.7 0-1.2.5-1.2 1.2v31.2c0 3.8-2.7 6.5-6.3 6.5-3.7 0-6.4-2.7-6.4-6.5 0-2.1.7-4 1.9-5.5 1.6-.3 3-.7 4.3-1.2V24.6c0-4.5 2.7-8 7.4-9.2V12z"
        fill={markGlyph}
      />
    </g>
  );

  if (variant === "mark") {
    return (
      <svg
        className={className}
        viewBox="0 0 64 64"
        width="44"
        height="44"
        role="img"
        aria-label={title}
      >
        <title>{title}</title>
        {mark}
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg
        className={className}
        viewBox="0 0 300 52"
        width="176"
        height="30"
        role="img"
        aria-label={title}
      >
        <title>{title}</title>
        <text
          x="0"
          y="36"
          fill={ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="32"
          fontWeight="600"
          letterSpacing="3.2"
        >
          MUSIBRAS
        </text>
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 340 72"
      width="196"
      height="42"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <g transform="translate(0 4)">{mark}</g>
      <text
        x="80"
        y="40"
        fill={ink}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontWeight="600"
        letterSpacing="3"
      >
        MUSIBRAS
      </text>
      <text
        x="82"
        y="60"
        fill={brass}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9.5"
        fontWeight="500"
        letterSpacing="2.4"
      >
        INSTRUMENTOS MUSICAIS
      </text>
    </svg>
  );
}
