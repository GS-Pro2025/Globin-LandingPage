import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";

const BASE_URL = "https://globinapp.com";
const DEFAULT_LOCALE = "en";
const LOCALES = ["en", "es", "pt"] as const;

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-family-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const urbanCat = localFont({
  src: [
    {
      path: "../../public/fonts/VladB - Urbancat Rg Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/VladB - Urbancat Rg Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/VladB - Urbancat Rg Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-family-display",
  display: "swap",
});

const META: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  es: {
    title: "Globin — Tu dinero, bajo control",
    description:
      "Globin es la app de finanzas personales para Latinoamérica. Controla tus gastos, ahorra más y alcanza tus metas financieras.",
    keywords: [
      "finanzas personales",
      "ahorro",
      "presupuesto",
      "app financiera",
      "Colombia",
      "LATAM",
    ],
  },
  en: {
    title: "Globin — Your money, under control",
    description:
      "Globin is the personal finance app for Latin America. Track expenses, save more, and reach your financial goals.",
    keywords: [
      "personal finance",
      "savings",
      "budget",
      "finance app",
      "Latin America",
    ],
  },
  pt: {
    title: "Globin — Seu dinheiro, sob controle",
    description:
      "Globin é o app de finanças pessoais para a América Latina. Controle seus gastos, economize mais e alcance suas metas financeiras.",
    keywords: [
      "finanças pessoais",
      "economia",
      "orçamento",
      "app financeiro",
      "América Latina",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META[DEFAULT_LOCALE];

  const canonicalPath = locale === DEFAULT_LOCALE ? "/" : `/${locale}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [
          l,
          `${BASE_URL}${l === DEFAULT_LOCALE ? "/" : `/${l}`}`,
        ]),
      ),
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "Globin",
      locale: locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_CO",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${nunito.variable} ${urbanCat.variable} scroll-smooth`}
    >
      <body className="relative min-h-screen font-body antialiased">
        <NextIntlClientProvider locale={locale}>
          {/* FONDO */}
          <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Video de fondo: desktop */}
            <video
              src="/preview.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            {/* Imagen de fondo: mobile */}
            <div className="md:hidden relative w-full h-full">
              <video
                src="/previewM.mp4"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
