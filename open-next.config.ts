// OpenNext-Konfiguration für Cloudflare Workers.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Alle Seiten werden beim Build vorab erzeugt (keine Revalidierung). Dafür reicht ein
  // Cache aus den statischen Dateien des Workers – kein R2-Bucket nötig, keine Zusatzkosten.
  // Kommt später dynamischer Inhalt mit Revalidierung dazu, auf R2 umstellen:
  // https://opennext.js.org/cloudflare/caching
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
