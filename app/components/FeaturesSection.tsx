"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
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

// ─── Types ────────────────────────────────────────────────────────────────────
interface SwiperInstance {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  on: (event: string, cb: (swiper: { realIndex: number }) => void) => void;
}
declare global {
  interface Window {
    Swiper: new (
      selector: string | HTMLElement,
      options: object
    ) => SwiperInstance;
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface FeatureSlide {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  src: string;
  alt: string;
}

const SLIDES: FeatureSlide[] = [
  {
    icon: Building2,
    titleKey: "features.card1.title",
    descKey: "features.card1.description",
    src: "/sl1.png",
    alt: "Feature 1",
  },
  {
    icon: Target,
    titleKey: "features.card2.title",
    descKey: "features.card2.description",
    src: "/sl2.png",
    alt: "Feature 2",
  },
  {
    icon: PiggyBank,
    titleKey: "features.card3.title",
    descKey: "features.card3.description",
    src: "/sl3.png",
    alt: "Feature 3",
  },
  {
    icon: Globe,
    titleKey: "features.card4.title",
    descKey: "features.card4.description",
    src: "/sl4.png",
    alt: "Feature 4",
  },
  {
    icon: Users,
    titleKey: "features.card5.title",
    descKey: "features.card5.description",
    src: "/sl1.png",
    alt: "Feature 5",
  },
  {
    icon: Home,
    titleKey: "features.card6.title",
    descKey: "features.card6.description",
    src: "/sl1.png",
    alt: "Feature 6",
  },
  {
    icon: Sparkles,
    titleKey: "features.card7.title",
    descKey: "features.card7.description",
    src: "/sl1.png",
    alt: "Feature 7",
  },
  {
    icon: BarChart3,
    titleKey: "features.card8.title",
    descKey: "features.card8.description",
    src: "/sl1.png",
    alt: "Feature 8",
  },
  {
    icon: Zap,
    titleKey: "features.card9.title",
    descKey: "features.card9.description",
    src: "/sl1.png",
    alt: "Feature 9",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function FeaturesSection() {
  const t = useTranslations();
  const swiperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<SwiperInstance | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleSlideChange = (newIndex: number) => {
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setVisible(true);
    }, 220);
  };

  useEffect(() => {
    const loadSwiper = async () => {
      if (!window.Swiper) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
        document.head.appendChild(link);

        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
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

        instanceRef.current.on("slideChange", (swiper) => {
          handleSlideChange(swiper.realIndex);
        });
      }
    };

    loadSwiper();
    return () => instanceRef.current?.destroy(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = SLIDES[activeIndex];
  const Icon = active.icon;

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap");

        /* ── Palette vars ── */
        #features-card {
          --lime:      #A2CB19;
          --teal:      #005242;
          --blush:     #D6CECE;
          --sage:      #3B6152;
          --deep:      #06231D;
        }

        #features-card {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--teal);
          min-height: 100vh;
          overflow: hidden;
          font-family: 'Comfortaa', cursive;
          padding: 60px 20px;
        }

        /* Glassmorphism card — tinted with deep teal */
        #features-card .fc-content {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 80px;
          width: 100%;
          max-width: 1200px;
          padding: 0;
          background: transparent;
          box-shadow: none;
          border: none;
        }

        /* ── Left pane ── */
        #features-card .fc-left {
          flex: 1;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          min-height: 340px;
          justify-content: center;
        }

        /* Fade transition */
        #features-card .fc-info-block {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        #features-card .fc-info-block.fc-hidden {
          opacity: 0;
          transform: translateY(12px);
        }
        #features-card .fc-info-block.fc-visible {
          opacity: 1;
          transform: translateY(0);
        }

        #features-card .fc-icon-wrap svg {
        }

        /* Counter eyebrow */
        #features-card .fc-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime);
          margin-bottom: 10px;
        }

        /* Feature title */
        #features-card .fc-feature-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.9rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 18px;
          color: var(--blush);
        }
        /* Highlighted word(s) in lime */
        #features-card .fc-feature-title em {
          font-style: normal;
          color: var(--lime);
        }

        /* Feature description */
        #features-card .fc-feature-desc {
          color: var(--blush);
          font-size: 1.5rem;
          line-height: 1.75;
          margin-bottom: 32px;
          max-width: 380px;
          opacity: 0.85;
        }

        /* Dot indicators */
        #features-card .fc-dots {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          max-width: 220px;
        }
        #features-card .fc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--sage);
          transition: background 0.3s, transform 0.3s, width 0.3s;
          border: none;
          padding: 0;
          cursor: default;
        }
        #features-card .fc-dot.active {
          background: var(--lime);
          transform: scale(1.4);
          width: 20px;
          border-radius: 4px;
        }

        /* CTA button */
        #features-card .fc-btn {
          display: inline-block;
          margin-top: 28px;
          padding: 11px 40px;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 6px;
          outline: none;
          color: var(--deep);
          background: var(--lime);
          box-shadow: 0 6px 24px rgba(162, 203, 25, 0.30);
          border: none;
          cursor: pointer;
          font-family: 'Comfortaa', cursive;
          align-self: flex-start;
          transition: background 0.2s, transform 0.1s;
        }
        #features-card .fc-btn:hover {
          background: #b8e020;
          animation: fc-gelatine 0.5s 1;
        }
        @keyframes fc-gelatine {
          0%,100% { transform:scale(1,1); }
          25%      { transform:scale(0.9,1.1); }
          50%      { transform:scale(1.1,0.9); }
          75%      { transform:scale(0.95,1.05); }
        }

        /* ── Right pane: Swiper ── */
        #features-card .fc-swiper-wrap {
          width: 250px;
          min-width: 450px;
          height: 650px;
          padding: 50px 0;
        }

        #features-card .swiper-slide {
          position: relative;
          box-shadow: 0 15px 50px rgba(6, 35, 29, 0.5);
          border-radius: 16px;
          user-select: none;
          overflow: hidden;
          border: 1px solid rgba(59, 97, 82, 0.4);
        }
        #features-card .swiper-slide img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        #features-card .fc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--deep), transparent 60%);
        }
        #features-card .fc-slide-label {
          position: absolute;
          bottom: 0; left: 0;
          color: var(--blush);
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.4;
          margin: 0 0 18px 18px;
        }

        /* ── Animated circles (palette-tinted) ── */
        #features-card .fc-circles {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          overflow: hidden;
          list-style: none;
          margin: 0; padding: 0;
        }
        #features-card .fc-circles li {
          position: absolute;
          display: block;
          animation: fc-animate 25s linear infinite;
          bottom: -150px;
          opacity: 0.18;
        }
        /* Alternate lime and sage circles */
        #features-card .fc-circles li:nth-child(odd)  { background: var(--lime); }
        #features-card .fc-circles li:nth-child(even) { background: var(--sage); }

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

        /* ── Responsive ── */
        @media (max-width: 800px) {
          #features-card .fc-content {
            flex-direction: column-reverse;
            padding: 36px 24px 48px;
            gap: 32px;
          }
          #features-card .fc-left { align-items: center; text-align: center; }
          #features-card .fc-feature-desc { max-width: 100%; }
          #features-card .fc-btn { align-self: center; }
          #features-card .fc-dots { justify-content: center; max-width: 100%; }
          #features-card .fc-swiper-wrap { width:300px; min-width:300px; height:460px; }
        }
      `}</style>

      <section id="features-card">
        <div className="fc-content">
          {/* ── LEFT ── */}
          <div className="fc-left">
            <div
              className={`fc-info-block ${visible ? "fc-visible" : "fc-hidden"
                }`}
            >
              <h1 className="fc-feature-title">{t(active.titleKey)}</h1>
              <h3 className="fc-feature-desc">{t(active.descKey)}</h3>
            </div>

            <div className="fc-dots">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`fc-dot ${i === activeIndex ? "active" : ""}`}
                />
              ))}
            </div>

            <button className="fc-btn">{t("features.cta")}</button>
          </div>

          {/* ── RIGHT: Swiper ── */}
          <div className="fc-swiper-wrap swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {SLIDES.map((slide, i) => (
                <div className="swiper-slide" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.src} alt={slide.alt} />
                  <div className="fc-overlay"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated background circles */}
        <ul className="fc-circles">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} />
          ))}
        </ul>
      </section>
    </>
  );
}
