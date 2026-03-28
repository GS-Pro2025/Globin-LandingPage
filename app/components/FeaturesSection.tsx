"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Building2, Target, PiggyBank, Globe, Users,
  Home, Sparkles, BarChart3, Zap, type LucideIcon,
} from "lucide-react";

interface SwiperInstance {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  on: (event: string, cb: (swiper: { realIndex: number }) => void) => void;
}
declare global {
  interface Window {
    Swiper: new (selector: string | HTMLElement, options: object) => SwiperInstance;
  }
}

interface FeatureSlide {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  src: string;
  alt: string;
}

const SLIDES: FeatureSlide[] = [
  { icon: Building2, titleKey: "features.card1.title", descKey: "features.card1.description", src: "/sl1.png", alt: "Feature 1" },
  { icon: Target,    titleKey: "features.card2.title", descKey: "features.card2.description", src: "/sl2.png", alt: "Feature 2" },
  { icon: PiggyBank, titleKey: "features.card3.title", descKey: "features.card3.description", src: "/s1.png",  alt: "Feature 3" },
  { icon: Globe,     titleKey: "features.card4.title", descKey: "features.card4.description", src: "/s2.png",  alt: "Feature 4" },
  { icon: Users,     titleKey: "features.card5.title", descKey: "features.card5.description", src: "/s3.png",  alt: "Feature 5" },
  { icon: Home,      titleKey: "features.card6.title", descKey: "features.card6.description", src: "/s4.png",  alt: "Feature 6" },
  { icon: Sparkles,  titleKey: "features.card7.title", descKey: "features.card7.description", src: "/s5.png",  alt: "Feature 7" },
  { icon: BarChart3, titleKey: "features.card8.title", descKey: "features.card8.description", src: "/s6.png",  alt: "Feature 8" },
  { icon: Zap,       titleKey: "features.card9.title", descKey: "features.card9.description", src: "/s7.png",  alt: "Feature 9" },
];

export function FeaturesSection() {
  const t = useTranslations();
  const swiperRef   = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<SwiperInstance | null>(null);
  const sectionRef  = useRef<HTMLElement>(null);

  const [activeIndex,    setActiveIndex]    = useState(0);
  const [visible,        setVisible]        = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasEntered,     setHasEntered]     = useState(false);
  const [shuffleState,   setShuffleState]   = useState<"idle"|"shuffling"|"done">("idle");

  const handleSlideChange = useCallback((newIndex: number) => {
    setVisible(false);
    setTimeout(() => { setActiveIndex(newIndex); setVisible(true); }, 220);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect   = section.getBoundingClientRect();
      const wh     = window.innerHeight;
      const total  = rect.height + wh;
      const passed = wh - rect.top;
      setScrollProgress(Math.max(0, Math.min(1, passed / total)));
      if (!hasEntered && rect.top < wh * 0.8) setHasEntered(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered || shuffleState !== "idle") return;
    setShuffleState("shuffling");
    setTimeout(() => setShuffleState("done"), 1400);
  }, [hasEntered, shuffleState]);

  useEffect(() => {
    const loadSwiper = async () => {
      if (!window.Swiper) {
        const link = document.createElement("link");
        link.rel  = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
        document.head.appendChild(link);
        await new Promise<void>((resolve) => {
          const script  = document.createElement("script");
          script.src    = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }
      if (swiperRef.current && window.Swiper) {
        instanceRef.current = new window.Swiper(swiperRef.current, {
          effect: "cards",
          cardsEffect: { rotate: true },
          grabCursor: true,
          initialSlide: 0,
          speed: 500,
          loop: true,
          mousewheel: { invert: false },
        });
        instanceRef.current.on("slideChange", (swiper) => handleSlideChange(swiper.realIndex));
      }
    };
    loadSwiper();
    return () => instanceRef.current?.destroy(true, true);
  }, [handleSlideChange]);

  const active    = SLIDES[activeIndex];
  const leftX     = hasEntered ? 0 : -80;
  const leftO     = hasEntered ? 1 : 0;
  const rightX    = hasEntered ? 0 : 80;
  const rightO    = hasEntered ? 1 : 0;
  const parallaxY = scrollProgress * -40;

  return (
    <>
      <style>{`
        #features-card {
          --lime:  #A2CB19;
          --teal:  #D6CECE;
          --blush: #06231D;
          --sage:  #3B6152;
          --deep:  #06231D;

          /*
           * Usa las CSS variables que next/font inyecta en <html>
           * via className={nunito.variable + " " + urbanCat.variable}
           * --font-family-display → UrbanCat
           * --font-family-body    → Nunito
           */
          --fc-display: var(--font-family-display), ui-sans-serif, system-ui;
          --fc-body:    var(--font-family-body),    ui-sans-serif, system-ui;
        }

        #features-card {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--teal);
          min-height: 100vh;
          overflow: hidden;
          font-family: var(--fc-body);
          padding: 60px 20px;
        }

        #features-card .fc-content {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 80px;
          width: 100%;
          max-width: 1200px;
          z-index: 10;
        }

        #features-card .fc-left {
          flex: 1;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          min-height: 340px;
          justify-content: center;
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
        }

        #features-card .fc-info-block {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        #features-card .fc-info-block.fc-hidden  { opacity:0; transform:translateY(12px); }
        #features-card .fc-info-block.fc-visible { opacity:1; transform:translateY(0); }

        /* UrbanCat para títulos */
        #features-card .fc-feature-title {
          font-family: var(--fc-display);
          font-size: 2.9rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 18px;
          color: var(--blush);
        }
        #features-card .fc-feature-title em { font-style:normal; color:var(--lime); }

        /* Nunito para descripción */
        #features-card .fc-feature-desc {
          font-family: var(--fc-body);
          color: var(--blush);
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.75;
          margin-bottom: 32px;
          max-width: 380px;
          opacity: 0.85;
        }

        #features-card .fc-dots { display:flex; gap:8px; flex-wrap:wrap; max-width:220px; }
        #features-card .fc-dot {
          width:8px; height:8px; border-radius:50%;
          background:var(--sage);
          transition: background .3s, transform .3s, width .3s;
          border:none; padding:0; cursor:default;
        }
        #features-card .fc-dot.active {
          background:var(--lime); transform:scale(1.4);
          width:20px; border-radius:4px;
        }

        /* UrbanCat para el botón */
        #features-card .fc-btn {
          display: inline-block;
          margin-top: 28px;
          padding: 11px 40px;
          font-family: var(--fc-display);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 6px;
          color: var(--deep);
          background: var(--lime);
          box-shadow: 0 6px 24px rgba(162,203,25,.30);
          border: none; cursor: pointer;
          align-self: flex-start;
          transition: background .2s, transform .1s;
        }
        #features-card .fc-btn:hover {
          background: #b8e020;
          animation: fc-gelatine 0.5s 1;
        }
        @keyframes fc-gelatine {
          0%,100% { transform:scale(1,1); }
          25%      { transform:scale(.9,1.1); }
          50%      { transform:scale(1.1,.9); }
          75%      { transform:scale(.95,1.05); }
        }

        #features-card .fc-swiper-outer {
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        #features-card .fc-swiper-wrap {
          width: 250px; min-width: 450px;
          height: 650px; padding: 50px 0;
        }

        /* Shuffle */
        #features-card.fc-shuffling .swiper-slide:nth-child(1)  { animation: fc-deal 0.55s 0.00s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(2)  { animation: fc-deal 0.55s 0.07s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(3)  { animation: fc-deal 0.55s 0.14s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(4)  { animation: fc-deal 0.55s 0.21s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(5)  { animation: fc-deal 0.55s 0.28s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(6)  { animation: fc-deal 0.55s 0.35s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(7)  { animation: fc-deal 0.55s 0.42s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(8)  { animation: fc-deal 0.55s 0.49s both; }
        #features-card.fc-shuffling .swiper-slide:nth-child(9)  { animation: fc-deal 0.55s 0.56s both; }

        @keyframes fc-deal {
          0%   { transform:translateX(200px) translateY(-80px) rotate(25deg) scale(.7); opacity:0; }
          60%  { transform:translateX(-12px) translateY(6px)   rotate(-4deg) scale(1.04); opacity:1; }
          80%  { transform:translateX(5px)   translateY(-3px)  rotate(2deg)  scale(.98); }
          100% { transform:translateX(0)     translateY(0)     rotate(0deg)  scale(1); opacity:1; }
        }

        #features-card.fc-pre-enter .swiper-slide { opacity:0; }

        #features-card .swiper-slide {
          position:relative;
          box-shadow: 0 15px 50px rgba(6,35,29,.5);
          border-radius:16px; user-select:none; overflow:hidden;
          border:1px solid rgba(59,97,82,.4);
        }
        #features-card .swiper-slide img {
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
        }
        #features-card .fc-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, var(--deep), transparent 60%);
        }

        /* Bg circles */
        #features-card .fc-circles {
          position:absolute; top:0; left:0; width:100%; height:100%;
          overflow:hidden; list-style:none; margin:0; padding:0; pointer-events:none;
        }
        #features-card .fc-circles li {
          position:absolute; display:block;
          animation:fc-animate 25s linear infinite;
          bottom:-150px; opacity:.18;
        }
        #features-card .fc-circles li:nth-child(odd)  { background:var(--lime); }
        #features-card .fc-circles li:nth-child(even) { background:var(--sage); }
        #features-card .fc-circles li:nth-child(1)  { left:25%; width:80px;  height:80px;  animation-delay:0s; }
        #features-card .fc-circles li:nth-child(2)  { left:10%; width:20px;  height:20px;  animation-delay:2s;  animation-duration:12s; }
        #features-card .fc-circles li:nth-child(3)  { left:70%; width:20px;  height:20px;  animation-delay:4s; }
        #features-card .fc-circles li:nth-child(4)  { left:40%; width:60px;  height:60px;  animation-delay:0s;  animation-duration:18s; }
        #features-card .fc-circles li:nth-child(5)  { left:65%; width:20px;  height:20px;  animation-delay:0s; }
        #features-card .fc-circles li:nth-child(6)  { left:75%; width:110px; height:110px; animation-delay:3s; }
        #features-card .fc-circles li:nth-child(7)  { left:35%; width:150px; height:150px; animation-delay:7s; }
        #features-card .fc-circles li:nth-child(8)  { left:50%; width:25px;  height:25px;  animation-delay:15s; animation-duration:45s; }
        #features-card .fc-circles li:nth-child(9)  { left:20%; width:15px;  height:15px;  animation-delay:2s;  animation-duration:35s; }
        #features-card .fc-circles li:nth-child(10) { left:85%; width:150px; height:150px; animation-delay:0s;  animation-duration:11s; }
        @keyframes fc-animate {
          0%   { transform:translateY(0) rotate(0deg);         border-radius:0; }
          100% { transform:translateY(-1000px) rotate(720deg); border-radius:50%; opacity:0; }
        }

        @media (max-width: 800px) {
          #features-card .fc-content { flex-direction:column-reverse; gap:32px; }
          #features-card .fc-left { align-items:center; text-align:center; }
          #features-card .fc-feature-desc { max-width:100%; }
          #features-card .fc-btn { align-self:center; }
          #features-card .fc-dots { justify-content:center; max-width:100%; }
          #features-card .fc-swiper-wrap { width:300px; min-width:300px; height:460px; }
        }
      `}</style>

      <section
        id="features-card"
        ref={sectionRef}
        className={
          shuffleState === "idle"      ? "fc-pre-enter" :
          shuffleState === "shuffling" ? "fc-shuffling"  : ""
        }
      >
        <div className="fc-content">

          {/* LEFT */}
          <div
            className="fc-left"
            style={{
              opacity: leftO,
              transform: `translateX(${leftX}px) translateY(${parallaxY * 0.6}px)`,
              transitionDelay: "0.05s",
            }}
          >
            <div className={`fc-info-block ${visible ? "fc-visible" : "fc-hidden"}`}>
              <h1 className="fc-feature-title">{t(active.titleKey)}</h1>
              <h3 className="fc-feature-desc">{t(active.descKey)}</h3>
            </div>
            <div className="fc-dots">
              {SLIDES.map((_, i) => (
                <div key={i} className={`fc-dot ${i === activeIndex ? "active" : ""}`} />
              ))}
            </div>
            <button className="fc-btn">{t("features.cta")}</button>
          </div>

          {/* RIGHT */}
          <div
            className="fc-swiper-outer"
            style={{
              opacity: rightO,
              transform: `translateX(${rightX}px) translateY(${parallaxY}px)`,
              transitionDelay: "0.15s",
            }}
          >
            <div className="fc-swiper-wrap swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {SLIDES.map((slide, i) => (
                  <div className="swiper-slide" key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.src} alt={slide.alt} />
                    <div className="fc-overlay" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ul className="fc-circles">
          {Array.from({ length: 10 }).map((_, i) => <li key={i} />)}
        </ul>
      </section>
    </>
  );
}