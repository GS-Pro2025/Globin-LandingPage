"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBeta = () => {
    document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 ">
      {/* Overlay de marca: Verde oscuro con transparencia */}
      <div className="absolute inset-0 bg-dark-card/60 z-0" />

      {/* Glow ambiental dinámico con Framer Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 70% 50%, rgba(196, 240, 77, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 py-12">
        
        {/* LADO IZQUIERDO: CONTENIDO TEXTUAL */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          
          {/* Badge / Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-primary text-primary bg-primary/10">
              {t("eyebrow")}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 leading-[1.1] text-primary"
          >
            {t("headline")}
          </motion.h1>

          {/* Subtitle - Usa Nunito por defecto */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-body"
          >
            {t("subheadline")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToBeta}
              className="px-10 py-4 rounded-xl font-bold text-lg bg-primary text-dark-card shadow-[0_10px_40px_rgba(196,240,77,0.3)] transition-all w-full sm:w-auto"
            >
              {t("cta.primary")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(196, 240, 77, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToFeatures}
              className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-primary text-primary bg-transparent transition-all w-full sm:w-auto"
            >
              {t("cta.secondary")}
            </motion.button>
          </motion.div>
        </div>

        {/* LADO DERECHO: IMAGEN / MOCKUP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 flex justify-center order-1 md:order-2 relative"
        >
          {/* Brillo detrás de la imagen */}
          <div className="absolute inset-0 blur-[100px] bg-primary/20 rounded-full scale-75 animate-pulse" />
          
          <div className="relative z-10 w-full max-w-lg">
            <Image
              src="/Gb1.svg"
              alt="Globin app preview"
              width={820}
              height={500}
              className="object-contain w-full h-auto drop-shadow-[0_0_50px_rgba(196,240,77,0.2)]"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}