import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Image from "next/image";

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
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
    <html lang={locale}>
      <body className="relative min-h-screen">
        <NextIntlClientProvider locale={locale}>
          {/* Imagen de Escritorio (Oculta en móviles) */}
          <div className="hidden md:block fixed inset-0 -z-10">
            <Image
              src="/Bg1.jpg"
              alt="Background Desktop"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Imagen de Móvil (Oculta en escritorio) */}
          <div className="block md:hidden fixed inset-0 -z-10">
            <Image
              src="/bg1m.jpg"
              alt="Background Mobile"
              fill
              priority
              className="object-cover object-top"
            />
          </div>

          {/* Contenido principal */}
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