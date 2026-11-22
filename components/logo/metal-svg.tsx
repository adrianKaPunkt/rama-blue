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
import { BLOOM, RISE, SHINE_CYCLE, SHINE_OVERLAP, SPIN } from "./timing";

export type MetalVariant = "current" | "gold";

/** Gemeinsame Props von Lotus, Wordmark und Logo. */
export type MetalProps = {
  /** "current": Farbe kommt per className (z. B. text-wine). "gold": Champagnergold mit Verlauf. */
  variant?: MetalVariant;
  /** Glanzstreifen, der regelmäßig über die Grafik läuft. Wirkt nur bei variant="gold". */
  animated?: boolean;
  /** Einmaliger Auftritt beim Laden: Blüte blüht auf, Schrift blendet ein. */
  intro?: boolean;
  /** Die Blüte dreht sich langsam um ihre Mitte (nach dem Aufblühen). */
  spin?: boolean;
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

const center = (b: Box) => ({ cx: b.x + b.width / 2, cy: b.y + b.height / 2 });

/** Zeitpunkt, an dem der Auftritt einer Ebene fertig ist. */
function introEnd(layer: MetalLayer) {
  if (layer.kind === "lotus") {
    return Math.max(...layer.petals.map(petalDelay)) + BLOOM.duration;
  }
  return (layer.introDelay ?? 0) + RISE.duration;
}

/** Alle Pfade einer Ebene als d-Strings (für den Clip des Glanzstreifens). */
const layerPaths = (layer: MetalLayer) =>
  layer.kind === "lotus" ? layer.petals.map((p) => p.d) : [layer.d];

/** Pfade einer Ebene mit der gegebenen Füllung, beim Intro mit Auftritts-Animation. */
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
  // (Die Animation sitzt auf der Gruppe, weil ein CSS-transform am Pfad
  // dessen transform-Attribut ersetzen würde.)
  const { cx, cy } = center(layer.box);
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

/** Dreht den Inhalt endlos um die Mitte von box. back: gegenläufig, hebt eine äußere Drehung auf. */
function Spinner({
  box,
  delay,
  back = false,
  children,
}: {
  box: Box;
  delay: number;
  back?: boolean;
  children: ReactNode;
}) {
  const { cx, cy } = center(box);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className={back ? styles.spinBack : styles.spin} style={timing(SPIN.duration, delay)}>
        <g transform={`translate(${-cx} ${-cy})`}>{children}</g>
      </g>
    </g>
  );
}

/**
 * Interne Basis für alle Logo-Teile: zeichnet Pfade einfarbig oder in Gold,
 * auf Wunsch mit Auftritt beim Laden, drehender Blüte und einem Glanzstreifen,
 * der als ein Lichtreflex über alle Teile läuft.
 */
export function MetalSvg({
  box,
  layers,
  variant = "current",
  animated = false,
  intro = false,
  spin = false,
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

  /** Die Blüte dreht sich, alles andere bleibt stehen. */
  const spins = (l: MetalLayer) => spin && l.kind === "lotus";
  const spinDelay = (l: MetalLayer) => (intro ? introEnd(l) : 0);

  if (variant === "current") {
    return (
      <svg {...svgProps}>
        {titleEl}
        {layers.map((l, i) => {
          const content = renderLayer(l, "currentColor", intro, l.className);
          return spins(l) ? (
            <Spinner key={i} box={l.box} delay={spinDelay(l)}>
              {content}
            </Spinner>
          ) : (
            <g key={i}>{content}</g>
          );
        })}
      </svg>
    );
  }

  const shineId = `${id}-shine`;
  const clipId = (i: number) => `${id}-clip-${i}`;

  // Glanzstreifen: um die Mitte gedreht, startet links außerhalb und endet rechts außerhalb.
  // Jede Ebene bekommt eine eigene, auf ihre Form beschnittene Kopie desselben Streifens.
  // Gleiche Lage, gleiches Timing: zusammen wirken sie wie ein einziger Lichtreflex.
  const { cx, cy } = center(box);
  const radius = Math.hypot(box.width, box.height) / 2;
  const band = radius * 2 * SHINE_WIDTH_RATIO;
  const shineDelay = intro ? Math.max(0, Math.max(...layers.map(introEnd)) - SHINE_OVERLAP) : 0;
  const shineStyle = {
    "--shine-distance": `${2 * radius + band}px`,
    ...timing(SHINE_CYCLE, shineDelay),
  } as CSSProperties;
  const shine = (
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
  );

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
            {layers.map((l, i) => (
              <clipPath key={i} id={clipId(i)}>
                {layerPaths(l).map((d, j) => (
                  <path key={j} d={d} />
                ))}
              </clipPath>
            ))}
          </>
        )}
      </defs>

      {layers.map((l, i) => {
        const content = renderLayer(l, `url(#${id}-gold-${i})`, intro);
        if (!spins(l)) {
          return (
            <g key={i}>
              {content}
              {animated && <g clipPath={`url(#${clipId(i)})`}>{shine}</g>}
            </g>
          );
        }
        // Drehende Blüte: Der Clip dreht mit (er sitzt im drehenden Koordinatensystem),
        // der Streifen selbst wird gegenläufig gedreht und bleibt so fest im Raum.
        return (
          <Spinner key={i} box={l.box} delay={spinDelay(l)}>
            {content}
            {animated && (
              <g clipPath={`url(#${clipId(i)})`}>
                <Spinner box={l.box} delay={spinDelay(l)} back>
                  {shine}
                </Spinner>
              </g>
            )}
          </Spinner>
        );
      })}
    </svg>
  );
}
