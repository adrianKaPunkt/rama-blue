// Champagner- bzw. Roségold nach dem Entwurf des Besitzers.
// Senkrechter Verlauf je Logo-Teil: Licht von oben, mit einem Reflexband in der Mitte.
export const GOLD_STOPS = [
  { offset: "0%", color: "#f5dcc0" },
  { offset: "35%", color: "#d6a97f" },
  { offset: "55%", color: "#e9c6a2" },
  { offset: "78%", color: "#b9875f" },
  { offset: "100%", color: "#8f6243" },
] as const;

/** Leichte Neigung des Verlaufs: horizontaler Versatz pro Höhe (0 = genau senkrecht). */
export const GOLD_TILT = 0.35;

// Glanzstreifen: heller Kern, weich auslaufende Ränder.
export const SHINE_COLOR = "#ffe8cc";
export const SHINE_STOPS = [
  { offset: "0%", opacity: 0 },
  { offset: "35%", opacity: 0.35 },
  { offset: "50%", opacity: 1 },
  { offset: "65%", opacity: 0.35 },
  { offset: "100%", opacity: 0 },
] as const;

/** Breite des Streifens im Verhältnis zur Diagonale der Grafik. */
export const SHINE_WIDTH_RATIO = 0.17;
/** Neigung des Streifens gegenüber der Senkrechten, in Grad. */
export const SHINE_ANGLE = 22;
