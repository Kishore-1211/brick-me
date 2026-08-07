interface LogoProps {
  size?: number;
  className?: string;
}

// Brickme logo mark — a brick-red tile with a subtle brickwork grid and a bold "B".
export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Brickme logo"
    >
      <defs>
        <linearGradient id="brickmeGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C0392B" />
          <stop offset="1" stopColor="#A5322A" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#brickmeGrad)" />
      {/* brickwork mortar lines */}
      <g stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round">
        <line x1="8" y1="24" x2="56" y2="24" />
        <line x1="8" y1="44" x2="56" y2="44" />
        <line x1="30" y1="8" x2="30" y2="24" />
        <line x1="18" y1="24" x2="18" y2="44" />
        <line x1="44" y1="24" x2="44" y2="44" />
        <line x1="30" y1="44" x2="30" y2="56" />
      </g>
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="40"
        fontWeight="800"
        fill="#ffffff"
      >
        B
      </text>
    </svg>
  );
}
