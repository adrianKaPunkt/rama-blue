import { useId, type CSSProperties } from "react";
import {
  GOLD_STOPS,
  GOLD_TILT,
  SHINE_ANGLE,
  SHINE_COLOR,
  SHINE_STOPS,
  SHINE_WIDTH_RATIO,
} from "./gold";
import type { Box } from "./paths";

export type MetalVariant = "current" | "gold";

/** Gemeinsame Props von Lotus, Wordmark und Logo. */
export type MetalProps = {
  /** "current": Farbe kommt per className (z. B. text-wine). "gold": Champagnergold mit Verlauf. */
  variant?: MetalVariant;
  /** Glanzstreifen, der regelmäßig über die Grafik läuft. Wirkt nur bei variant="gold". */
  animated?: boolean;
  /** Mit title wird die Grafik als Bild vorgelesen, ohne (oder leer) gilt sie als Dekoration. */
  title?: string;
  className?: string;
};

export type MetalLayer = {
  d: string;
  box: Box;
  /** Nur bei variant="current": Farbe dieses Teils, z. B. "text-wine". */
  className?: string;
};

type MetalSvgProps = MetalProps & {
  /** Sichtbarer Ausschnitt im gemeinsamen Logo-Koordinatensystem. */
  box: Box;
  layers: MetalLayer[];
};

/**
 * Interne Basis für alle Logo-Teile: zeichnet Pfade einfarbig oder in Gold,
 * auf Wunsch mit einem Glanzstreifen, der als ein Lichtreflex über alle Teile läuft.
 */
export function MetalSvg({
  box,
  layers,
  variant = "current",
  animated = false,
  title,
  className,
}: MetalSvgProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const a11y = title
    ? ({ role: "img", "aria-labelledby": titleId } as const)
    : ({ "aria-hidden": true } as const);

  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: `${box.x} ${box.y} ${box.width} ${box.height}`,
    className,
    ...a11y,
  };
  const titleEl = title ? <title id={titleId}>{title}</title> : null;

  if (variant === "current") {
    return (
      <svg {...svgProps}>
        {titleEl}
        {layers.map((l, i) => (
          <path key={i} d={l.d} fill="currentColor" className={l.className} />
        ))}
      </svg>
    );
  }

  const clipId = `${id}-clip`;
  const shineId = `${id}-shine`;

  // Glanzstreifen: um die Mitte gedreht, startet links außerhalb und endet rechts außerhalb.
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const radius = Math.hypot(box.width, box.height) / 2;
  const band = radius * 2 * SHINE_WIDTH_RATIO;
  const shineStyle = { "--shine-distance": `${2 * radius + band}px` } as CSSProperties;

  return (
    <svg {...svgProps}>
      {titleEl}
      <defs>
        {/* Ein Verlauf pro Teil (userSpaceOnUse): jeder Teil wird gleich beleuchtet,
            statt dass jedes einzelne Blütenblatt oder jeder Buchstabe seinen eigenen bekommt. */}
        {layers.map((l, i) => (
          <linearGradient
            key={i}
            id={`${id}-gold-${i}`}
            gradientUnits="userSpaceOnUse"
            x1={l.box.x}
            y1={l.box.y}
            x2={l.box.x + l.box.height * GOLD_TILT}
            y2={l.box.y + l.box.height}
          >
            {GOLD_STOPS.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        ))}
        {animated && (
          <>
            <linearGradient id={shineId} x1={0} y1={0} x2={1} y2={0}>
              {SHINE_STOPS.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={SHINE_COLOR} stopOpacity={s.opacity} />
              ))}
            </linearGradient>
            <clipPath id={clipId}>
              {layers.map((l, i) => (
                <path key={i} d={l.d} />
              ))}
            </clipPath>
          </>
        )}
      </defs>

      {layers.map((l, i) => (
        <path key={i} d={l.d} fill={`url(#${id}-gold-${i})`} />
      ))}

      {animated && (
        // Bei "Bewegung reduzieren" entfällt der Streifen, die Grafik bleibt in festem Gold.
        <g clipPath={`url(#${clipId})`} className="motion-reduce:hidden">
          <g transform={`rotate(${SHINE_ANGLE} ${cx} ${cy})`}>
            <rect
              x={cx - radius - band}
              y={cy - radius - 10}
              width={band}
              height={2 * radius + 20}
              fill={`url(#${shineId})`}
              style={shineStyle}
              className="animate-metal-shine"
            />
          </g>
        </g>
      )}
    </svg>
  );
}
