import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";

// 1. Configuración de Nunito (Fuente Base)
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-family-body", // Variable para el CSS
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// 2. Configuración de UrbanCat (Fuente de Títulos)
// Asegúrate de que la ruta sea: src/fonts/nombre-del-archivo.otf
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
  variable: "--font-family-display", // Variable para el CSS
  display: "swap",
});

// ... (tus imports de fuentes igual)

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${nunito.variable} ${urbanCat.variable} scroll-smooth`}>
      <body className="relative min-h-screen font-body antialiased">
        <NextIntlClientProvider locale={locale}>
          
          {/* CONTENEDOR DE IMAGEN DE FONDO */}
          <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Escritorio */}
            <div className="hidden md:block relative w-full h-full">
              <Image src="/Bg1.jpg" alt="BG" fill priority className="object-cover" />
            </div>
            {/* Móvil */}
            <div className="md:hidden relative w-full h-full">
              <Image src="/bg1m.jpg" alt="BG Mobile" fill priority className="object-cover object-top" />
            </div>
          </div>

          {/* CONTENIDO: Sin fondo sólido para que se vea la imagen de abajo */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}