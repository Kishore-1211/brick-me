import logoUrl from '../../assets/logo.png';

interface LogoProps {
  size?: number;
  className?: string;
}

// The source PNG is the full lockup (brick-B mark + "BRICK ME" + tagline) on a
// white square. For an icon we clip to just the brick-B mark and sit it on a
// white rounded tile so it reads well on both light and dark backgrounds.
export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <span
      className={`relative inline-block overflow-hidden rounded-lg bg-white flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Brickme logo"
    >
      <img
        src={logoUrl}
        alt="Brickme"
        style={{
          position: 'absolute',
          width: size * 2.08,
          height: size * 2.08,
          left: -size * 0.56,
          top: -size * 0.25,
          maxWidth: 'none',
        }}
      />
    </span>
  );
}
