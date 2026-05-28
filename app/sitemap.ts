import type { MetadataRoute } from "next";

const BASE_URL = "https://globinapp.com";
const LOCALES = ["en", "es", "pt"] as const;
const DEFAULT_LOCALE = "en";

// Añade aquí más rutas si la landing crece
const ROUTES = ["/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      // El locale por defecto (es) no lleva prefijo en la URL
      const localePath =
        locale === DEFAULT_LOCALE
          ? route
          : `/${locale}${route === "/" ? "" : route}`;

      entries.push({
        url: `${BASE_URL}${localePath}`,
        lastModified: new Date("2026-07-01"),
        changeFrequency: "monthly",
        priority: route === "/" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => {
              const lPath =
                l === DEFAULT_LOCALE
                  ? route
                  : `/${l}${route === "/" ? "" : route}`;
              return [l, `${BASE_URL}${lPath}`];
            })
          ),
        },
      });
    }
  }

  return entries;
}