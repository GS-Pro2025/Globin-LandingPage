"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Target,
  PiggyBank,
  Globe,
  Users,
  Home,
  Sparkles,
  BarChart3,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface FeatureSlide {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  src: string;
  alt: string;
}

const SLIDES: FeatureSlide[] = [
  { icon: Building2, titleKey: "features.card1.title", descKey: "features.card1.description", src: "/sl1.png", alt: "Feature 1" },
  { icon: Target, titleKey: "features.card2.title", descKey: "features.card2.description", src: "/sl2.png", alt: "Feature 2" },
  { icon: PiggyBank, titleKey: "features.card3.title", descKey: "features.card3.description", src: "/s1.png", alt: "Feature 3" },
  { icon: Globe, titleKey: "features.card4.title", descKey: "features.card4.description", src: "/s2.png", alt: "Feature 4" },
  { icon: Users, titleKey: "features.card5.title", descKey: "features.card5.description", src: "/s3.png", alt: "Feature 5" },
  { icon: Home, titleKey: "features.card6.title", descKey: "features.card6.description", src: "/s4.png", alt: "Feature 6" },
  { icon: Sparkles, titleKey: "features.card7.title", descKey: "features.card7.description", src: "/s5.png", alt: "Feature 7" },
  { icon: BarChart3, titleKey: "features.card8.title", descKey: "features.card8.description", src: "/s6.png", alt: "Feature 8" },
  { icon: Zap, titleKey: "features.card9.title", descKey: "features.card9.description", src: "/s7.png", alt: "Feature 9" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface SwiperInstance {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  on: (event: string, cb: (swiper: { realIndex: number }) => void) => void;
}
declare global {
  interface Window {
    Swiper: new (selector: string | HTMLElement, options: object) => SwiperInstance;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FeaturesSection() {
  const t = useTranslations();
  const swiperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<SwiperInstance | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadSwiper = async () => {
      if (!window.Swiper) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
        document.head.appendChild(link);

        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      if (swiperRef.current && window.Swiper) {
        instanceRef.current = new window.Swiper(swiperRef.current, {
          effect: "cards",
          cardsEffect: { rotate: true, slideShadows: false },
          grabCursor: true,
          initialSlide: 0,
          speed: 500,
          loop: true,
        });

        instanceRef.current.on("slideChange", (swiper) => {
          setActiveIndex(swiper.realIndex);
        });
      }
    };

    loadSwiper();
    return () => instanceRef.current?.destroy(true, true);
  }, []);

  if (!mounted) return <div style={{ minHeight: "100vh", background: "#D6CECE" }} />;

  const active = SLIDES[activeIndex];

  return (
    <>
      <style>{`
        #features-card {
          --lime: #A2CB19; --teal: #D6CECE; --blush: #005242; --sage: #3B6152; --deep: #06231D;
          position: relative; display: flex; justify-content: center; align-items: center;
          background: var(--teal); min-height: 100vh; overflow: hidden;
          font-family: 'Poppins', sans-serif; padding: 60px 20px;
        }
        .fc-content { position: relative; display: flex; gap: 60px; width: 100%; max-width: 1100px; z-index: 10; align-items: center; }
        .fc-left { flex: 1; max-width: 450px; }
        
        /* Título Medium */
        .fc-feature-title { 
          font-size: 2.2rem; 
          font-weight: 500; 
          color: var(--blush); 
          line-height: 1.2; 
          margin-bottom: 16px; 
        }
        
        .fc-feature-desc { color: var(--blush); font-size: 1.1rem; line-height: 1.6; opacity: 0.8; margin-bottom: 28px; }
        .fc-dots { display: flex; gap: 6px; margin-bottom: 20px; }
        .fc-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); transition: all 0.3s; }
        .fc-dot.active { background: var(--lime); width: 18px; border-radius: 3px; }
        .fc-btn { background: var(--lime); padding: 10px 32px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; color: var(--deep); }

        /* Cartas pequeñas */
        .fc-swiper-wrap { width: 320px; height: 480px; }
        .swiper-slide { border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        .swiper-slide img { width: 100%; height: 100%; object-fit: cover; }

        @media (max-width: 900px) {
          .fc-content { flex-direction: column-reverse; text-align: center; gap: 30px; }
          .fc-left { display: flex; flex-direction: column; align-items: center; }
          .fc-swiper-wrap { width: 260px; height: 380px; }
        }
      `}</style>

      <section id="features-card">
        <div className="fc-content">
          <motion.div 
            className="fc-left"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="fc-feature-title">{t(active.titleKey)}</h1>
                <h3 className="fc-feature-desc">{t(active.descKey)}</h3>
              </motion.div>
            </AnimatePresence>

            <div className="fc-dots">
              {SLIDES.map((_, i) => (
                <div key={i} className={`fc-dot ${i === activeIndex ? "active" : ""}`} />
              ))}
            </div>

            <button className="fc-btn">{t("features.cta")}</button>
          </motion.div>

          <motion.div 
            className="fc-swiper-wrap swiper" 
            ref={swiperRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="swiper-wrapper">
              {SLIDES.map((slide, i) => (
                <div className="swiper-slide" key={i}>
                  <img src={slide.src} alt={slide.alt} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}