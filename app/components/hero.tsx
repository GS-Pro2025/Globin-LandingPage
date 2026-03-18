"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isActive = loaded && visible;

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBeta = () => {
    document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#06231DBF]/80" />

      {/* Glow ambiental */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(162, 203, 25, 0.07) 0%, transparent 65%)",
          opacity: isActive ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 md:py-20">

        {/* TOP en móvil / RIGHT en desktop — Image */}
        <div
          className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0) scale(1)" : "translateX(60px) scale(0.93)",
            transition: "opacity 1s ease 0.2s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-full">
            <div
              className="absolute inset-0 blur-3xl rounded-full pointer-events-none"
              style={{
                backgroundColor: "rgba(162, 203, 25, 0.12)",
                opacity: isActive ? 1 : 0,
                transition: "opacity 2s ease 0.8s",
              }}
            />
            <Image
              src="/Gb1.svg"
              alt="Globin app preview"
              width={820}
              height={500}
              className="object-contain w-full h-auto relative z-10"
              priority
              style={{
                filter: isActive
                  ? "drop-shadow(0 0 30px rgba(162, 203, 25, 0.2))"
                  : "drop-shadow(0 0 0px rgba(162, 203, 25, 0))",
                transition: "filter 1.5s ease 0.6s",
              }}
            />
          </div>
        </div>

        {/* BOTTOM en móvil / LEFT en desktop — Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">

          {/* Badge */}
          <div
            className="mb-4 md:mb-6 inline-flex"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <span
              className="px-4 py-1.5 md:px-6 md:py-2 rounded-xl text-xs md:text-sm font-bold tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(162, 203, 25, 0.15)",
                color: "#A2CB19",
                border: "1px solid #A2CB19",
              }}
            >
              {t("eyebrow")}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            style={{
              color: "#D6CECE",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}
          >
            {t("headline")}
          </h1>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed"
            style={{
              color: "#D6CECE",
              opacity: isActive ? 0.8 : 0,
              transform: isActive ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            {t("subheadline")}
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center md:items-start gap-3 md:gap-4 w-full"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.6s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            <button
              onClick={scrollToBeta}
              className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              style={{
                backgroundColor: "#A2CB19",
                color: "#06231D",
                boxShadow: "0 0 40px rgba(162, 203, 25, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 60px rgba(162, 203, 25, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(162, 203, 25, 0.3)";
              }}
            >
              {t("cta.primary")}
            </button>

            <button
              onClick={scrollToFeatures}
              className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              style={{
                backgroundColor: "transparent",
                color: "#A2CB19",
                border: "2px solid #A2CB19",
              }}
            >
              {t("cta.secondary")}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}