"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "../navigation"; 

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
      style={{ backgroundColor: "rgba(6, 35, 29, 0.8)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#A2CB19" }}
        >
          {t("title")}
        </h1>

        {/* Language Switch */}
        <div
          className="flex items-center gap-1 rounded-full p-1"
          style={{ backgroundColor: "#3B6152" }}
        >
          {(["en", "es", "pt"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-300"
              style={{
                backgroundColor: locale === lang ? "#A2CB19" : "transparent",
                color: locale === lang ? "#06231D" : "#D6CECE",
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}