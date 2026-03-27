"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "../navigation";
import Image from "next/image"; 
import Link from "next/link";   

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#005242]/80">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/globinlogo.png"      
            alt={t("title")}      
            width={150}           
            height={50}           
            priority              
          />
        </Link>

        {/* Language Switch */}
        <div
          className="flex items-center gap-1 rounded-lg p-1"
          style={{ backgroundColor: "#3B6152" }}
        >
          {(["en", "es", "pt"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300"
              style={{
                backgroundColor: locale === lang ? "#A2CB19" : "transparent",
                color: locale === lang ? "#06231D" : "#C4F04D",
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