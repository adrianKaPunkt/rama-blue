// Alle Zeiten der Logo-Animationen in Sekunden. Die Keyframes stehen in logo.module.css.

/** Glanzstreifen: Länge eines Zyklus (Wartezeit, Durchlauf, Pause). */
export const SHINE_CYCLE = 7;

/** Aufblühen der Blüte, Ring für Ring von innen nach außen. */
export const BLOOM = {
  /** Dauer, die ein einzelnes Blütenteil zum Aufgehen braucht */
  duration: 1,
  /** Versatz zwischen Kern, mittleren Blättern und äußeren Spitzen */
  ringDelay: 0.35,
  /** Zusätzlicher Versatz einmal im Kreis herum, für ein leichtes Aufdrehen */
  turnDelay: 0.25,
};

/** Einblenden von Schriftzug und Unterzeile. */
export const RISE = { duration: 1 };

/** Im Logo: Schriftzug startet, während die äußeren Spitzen noch aufgehen, die Unterzeile kurz danach. */
export const LOGO_WORDMARK_DELAY = 1.1;
export const LOGO_TAGLINE_DELAY = 1.5;

/** Wordmark allein: Unterzeile folgt dem Schriftzug. */
export const WORDMARK_TAGLINE_DELAY = 0.4;

/** Der erste Glanz startet so viel vor dem Ende des Intros (die Keyframes warten selbst noch kurz). */
export const SHINE_OVERLAP = 0.5;
