"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "../navigation";
import Image from "next/image";
import Link from "next/link";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [logoVisible, setLogoVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logo mount animation
  useEffect(() => {
    const id = setTimeout(() => setLogoVisible(true), 80);
    return () => clearTimeout(id);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
    setDropdownOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <>
      <style>{`
        @keyframes logoReveal {
          0%   { opacity: 0; transform: translateX(-18px) scale(0.96); filter: blur(6px); }
          60%  { opacity: 1; transform: translateX(2px) scale(1.01); filter: blur(0px); }
          100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0px); }
        }
        .logo-reveal {
          animation: logoReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .logo-hidden {
          opacity: 0;
        }

        @keyframes dropdownIn {
          0%   { opacity: 0; transform: translateY(-8px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dropdown-enter {
          animation: dropdownIn 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .lang-item {
          transition: background 0.18s ease, transform 0.18s ease;
        }
        .lang-item:hover {
          background: rgba(162, 203, 25, 0.12);
          transform: translateX(3px);
        }
        .lang-item.active {
          background: rgba(162, 203, 25, 0.18);
        }

        .trigger-btn {
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .trigger-btn:hover {
          background: rgba(162, 203, 25, 0.15);
          box-shadow: 0 0 0 1px rgba(162, 203, 25, 0.3);
        }
        .trigger-btn.open {
          background: rgba(162, 203, 25, 0.15);
          box-shadow: 0 0 0 1px rgba(162, 203, 25, 0.4);
        }

        .chevron {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .chevron.rotated {
          transform: rotate(180deg);
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(0, 82, 66, 0.82)",
          borderBottom: "1px solid rgba(162, 203, 25, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo con animación de entrada */}
          <Link
            href="/"
            className={`transition-opacity hover:opacity-75 ${logoVisible ? "logo-reveal" : "logo-hidden"}`}
          >
            <Image
              src="/globinlogo.png"
              alt={t("title")}
              width={140}
              height={46}
              priority
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Language Dropdown */}
          <div ref={dropdownRef} className="relative">
            {/* Trigger */}
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className={`trigger-btn flex items-center gap-2.5 px-3.5 py-2 rounded-xl ${dropdownOpen ? "open" : ""}`}
              style={{
                border: "1px solid rgba(162, 203, 25, 0.2)",
              }}
            >
              <span className="text-xl leading-none">{currentLang.flag}</span>
              <span
                className="text-sm font-semibold tracking-wide uppercase"
                style={{ color: "#C4F04D" }}
              >
                {currentLang.code}
              </span>
              <svg
                className={`chevron w-3.5 h-3.5 ${dropdownOpen ? "rotated" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                style={{ color: "rgba(196, 240, 77, 0.6)" }}
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div
                className="dropdown-enter absolute right-0 mt-2 w-44 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "rgba(4, 28, 22, 0.95)",
                  border: "1px solid rgba(162, 203, 25, 0.2)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(162,203,25,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="p-1.5 flex flex-col gap-0.5">
                  {LANGUAGES.map((lang) => {
                    const isActive = lang.code === locale;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`lang-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left ${isActive ? "active" : ""}`}
                      >
                        <span className="text-xl leading-none">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span
                            className="text-sm font-semibold leading-tight"
                            style={{ color: isActive ? "#A2CB19" : "#D6CECE" }}
                          >
                            {lang.label}
                          </span>
                          <span
                            className="text-xs uppercase tracking-widest"
                            style={{ color: "rgba(196, 240, 77, 0.4)" }}
                          >
                            {lang.code}
                          </span>
                        </div>
                        {isActive && (
                          <svg
                            className="ml-auto w-3.5 h-3.5 flex-shrink-0"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="#A2CB19"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Glow decorativo inferior */}
                <div
                  className="h-px w-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(162,203,25,0.3), transparent)",
                  }}
                />
              </div>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}