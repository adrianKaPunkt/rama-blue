import { useId, type CSSProperties, type ReactNode } from "react";
import {
  GOLD_STOPS,
  GOLD_TILT,
  SHINE_ANGLE,
  SHINE_COLOR,
  SHINE_STOPS,
  SHINE_WIDTH_RATIO,
} from "./gold";
import styles from "./logo.module.css";
import type { Box, Petal } from "./paths";
import { BLOOM, RISE, SHINE_CYCLE, SHINE_OVERLAP } from "./timing";

export type MetalVariant = "current" | "gold";

/** Gemeinsame Props von Lotus, Wordmark und Logo. */
export type MetalProps = {
  /** "current": Farbe kommt per className (z. B. text-wine). "gold": Champagnergold mit Verlauf. */
  variant?: MetalVariant;
  /** Glanzstreifen, der regelmäßig über die Grafik läuft. Wirkt nur bei variant="gold". */
  animated?: boolean;
  /** Einmaliger Auftritt beim Laden: Blüte blüht auf, Schrift blendet ein. */
  intro?: boolean;
  /** Mit title wird die Grafik als Bild vorgelesen, ohne (oder leer) gilt sie als Dekoration. */
  title?: string;
  className?: string;
};

export type MetalLayer = {
  box: Box;
  /** Nur bei variant="current": Farbe dieses Teils, z. B. "text-wine". */
  className?: string;
} & (
  | { kind: "lotus"; petals: readonly Petal[] }
  | { kind: "path"; d: string; /** Start des Einblendens beim Intro, in Sekunden */ introDelay?: number }
);

type MetalSvgProps = MetalProps & {
  /** Sichtbarer Ausschnitt im gemeinsamen Logo-Koordinatensystem. */
  box: Box;
  layers: MetalLayer[];
};

const petalDelay = (p: Petal) => p.ring * BLOOM.ringDelay + p.turn * BLOOM.turnDelay;

const timing = (duration: number, delay: number): CSSProperties => ({
  animationDuration: `${duration}s`,
  animationDelay: `${delay}s`,
});

/** Zeitpunkt, an dem der Auftritt einer Ebene fertig ist. */
function introEnd(layer: MetalLayer) {
  if (layer.kind === "lotus") {
    return Math.max(...layer.petals.map(petalDelay)) + BLOOM.duration;
  }
  return (layer.introDelay ?? 0) + RISE.duration;
}

/** Pfade einer Ebene, ohne Füllung (die Füllung setzt der Aufrufer). */
function renderLayer(layer: MetalLayer, fill: string, intro: boolean, className?: string): ReactNode {
  if (layer.kind === "path") {
    return intro ? (
      <path
        d={layer.d}
        fill={fill}
        className={`${styles.rise} ${className ?? ""}`}
        style={timing(RISE.duration, layer.introDelay ?? 0)}
      />
    ) : (
      <path d={layer.d} fill={fill} className={className} />
    );
  }

  if (!intro) {
    return layer.petals.map((p, i) => <path key={i} d={p.d} fill={fill} className={className} />);
  }

  // Jedes Teil sitzt in einer Gruppe, deren Ursprung die Blütenmitte ist.
  // So wächst und dreht es sich beim Aufblühen um die Mitte der Blüte.
  const cx = layer.box.x + layer.box.width / 2;
  const cy = layer.box.y + layer.box.height / 2;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {layer.petals.map((p, i) => (
        <g key={i} className={styles.petal} style={timing(BLOOM.duration, petalDelay(p))}>
          <path d={p.d} fill={fill} className={className} transform={`translate(${-cx} ${-cy})`} />
        </g>
      ))}
    </g>
  );
}

/**
 * Interne Basis für alle Logo-Teile: zeichnet Pfade einfarbig oder in Gold,
 * auf Wunsch mit Auftritt beim Laden und einem Glanzstreifen, der als ein
 * Lichtreflex über alle Teile läuft.
 */
export function MetalSvg({
  box,
  layers,
  variant = "current",
  animated = false,
  intro = false,
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
          <g key={i}>{renderLayer(l, "currentColor", intro, l.className)}</g>
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
  const shineDelay = intro ? Math.max(0, Math.max(...layers.map(introEnd)) - SHINE_OVERLAP) : 0;
  const shineStyle = {
    "--shine-distance": `${2 * radius + band}px`,
    ...timing(SHINE_CYCLE, shineDelay),
  } as CSSProperties;

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
              {layers.flatMap((l, i) =>
                l.kind === "lotus"
                  ? l.petals.map((p, j) => <path key={`${i}-${j}`} d={p.d} />)
                  : [<path key={i} d={l.d} />],
              )}
            </clipPath>
          </>
        )}
      </defs>

      {layers.map((l, i) => (
        <g key={i}>{renderLayer(l, `url(#${id}-gold-${i})`, intro)}</g>
      ))}

      {animated && (
        <g clipPath={`url(#${clipId})`}>
          <g transform={`rotate(${SHINE_ANGLE} ${cx} ${cy})`}>
            <rect
              x={cx - radius - band}
              y={cy - radius - 10}
              width={band}
              height={2 * radius + 20}
              fill={`url(#${shineId})`}
              style={shineStyle}
              className={styles.shine}
            />
          </g>
        </g>
      )}
    </svg>
  );
}
