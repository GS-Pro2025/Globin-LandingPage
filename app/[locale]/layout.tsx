// app/[locale]/layout.tsx
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

type Locale = "es" | "en" | "pt";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body 
        style={{
          backgroundImage: "url('/Bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundColor: "#06231D", 
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}