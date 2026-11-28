type MusibrasLogoProps = {
  variant?: "full" | "mark" | "wordmark";
  tone?: "ink" | "light";
  className?: string;
  title?: string;
};

/** Logo MUSIBRAS — marca + wordmark em SVG (atelier / brass). */
export function MusibrasLogo({
  variant = "full",
  tone = "ink",
  className = "",
  title = "MUSIBRAS",
}: MusibrasLogoProps) {
  const ink = tone === "light" ? "#fff8ee" : "#1c120d";
  const brass = tone === "light" ? "#d2b888" : "#8f7348";
  const markFill = tone === "light" ? "#2a1a12" : "#1c120d";
  const markStroke = "#d2b888";
  const wine = "#7a2433";

  const mark = (
    <g aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="11" fill={markFill} />
      <rect
        x="5"
        y="5"
        width="54"
        height="54"
        rx="9"
        stroke={markStroke}
        strokeWidth="1.4"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M32 12.5c-6.4 1-11 6-11 12.3 0 4.8 2.9 8.4 7.2 10.1-1.1 2.4-1.6 5-1.6 7.6 0 7.7 5.6 13.3 12.5 13.3s12.5-5.6 12.5-13.3c0-2.9-.7-5.6-1.9-8 3.7-1.9 6.2-5.5 6.2-9.7 0-6.5-5.1-11.2-11.9-11.5V12.8c-.6-.1-1.3-.2-1.9-.2l-.9-.1v5.7c3.5.3 5.9 2.6 5.9 5.4 0 3-2.5 5.3-6 5.3h-.6V19.8c0-.7-.5-1.2-1.2-1.2h-2.1c-.7 0-1.2.5-1.2 1.2v31.2c0 3.8-2.7 6.5-6.3 6.5-3.7 0-6.4-2.7-6.4-6.5 0-2.1.7-4 1.9-5.5 1.6-.3 3-.7 4.3-1.2V24.8c0-4.5 2.7-8 7.4-9.2v-3.1z"
        fill={markStroke}
      />
      <path
        d="M13 50c6.5 7.5 21 10 35 3"
        stroke={wine}
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
    </g>
  );

  if (variant === "mark") {
    return (
      <svg
        className={className}
        viewBox="0 0 64 64"
        width="40"
        height="40"
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
        viewBox="0 0 280 48"
        width="160"
        height="28"
        role="img"
        aria-label={title}
      >
        <title>{title}</title>
        <text
          x="0"
          y="34"
          fill={ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="32"
          fontWeight="700"
          letterSpacing="3.5"
        >
          MUSIBRAS
        </text>
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 300 64"
      width="168"
      height="36"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <g transform="translate(0 0)">{mark}</g>
      <text
        x="76"
        y="38"
        fill={ink}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="3.2"
      >
        MUSIBRAS
      </text>
      <text
        x="78"
        y="54"
        fill={brass}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="8"
        fontWeight="500"
        letterSpacing="2.4"
      >
        INSTRUMENTOS MUSICAIS
      </text>
    </svg>
  );
}
