"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function CountdownTimer() {
  const t = useTranslations("countdown");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 90);
    return date;
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t("days") },
    { value: timeLeft.hours, label: t("hours") },
    { value: timeLeft.minutes, label: t("minutes") },
    { value: timeLeft.seconds, label: t("seconds") },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#005242" }}
    >
      {/* Glow de fondo */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(162, 203, 25, 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* LEFT — Foto con efecto tiempo */}
          <div
            className="w-full md:w-2/5 flex justify-center md:justify-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.3)",
              transition: "opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1), transform 2.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="relative">
              {/* Glow ambiental */}
              <div
                className="absolute -inset-6 rounded-full blur-3xl"
                style={{
                  backgroundColor: "#A2CB19",
                  opacity: visible ? 0.2 : 0,
                  transition: "opacity 3.5s ease 1s",
                }}
              />
                <Image
                  src="/Gb2.png"
                  alt="Globin user"
                  width={380}
                  height={460}
                  className="object-cover object-top"
                  priority
                  style={{
                    filter: visible
                      ? "grayscale(0%) contrast(1) brightness(1) sepia(0%)"
                      : "grayscale(100%) contrast(1.4) brightness(0.6) sepia(90%)",
                    transition: "filter 4s cubic-bezier(0.16, 1, 0.3, 1) 2.6s",
                  }}
                />


                {/* Partículas de polvo */}
                {visible && (
                  <>
                    <div className="dust-particle" style={{ left: "20%", animationDelay: "0.8s" }} />
                    <div className="dust-particle" style={{ left: "50%", animationDelay: "1.4s" }} />
                    <div className="dust-particle" style={{ left: "75%", animationDelay: "2s" }} />
                    <div className="dust-particle" style={{ left: "35%", animationDelay: "2.6s" }} />
                    <div className="dust-particle" style={{ left: "60%", animationDelay: "3.2s" }} />
                  </>
                )}
              
            </div>
          </div>

          {/* RIGHT — Countdown */}
          <div
            className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(60px)",
              transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            <p
              className="text-lg mb-10 font-medium"
              style={{ color: "#D6CECE", opacity: 0.8 }}
            >
              {t("label")}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6">
              {timeUnits.map((unit, index) => (
                <div
                  key={index}
                  className="text-center relative"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
                    transition: `opacity 0.8s ease ${0.9 + index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.9 + index * 0.15}s`,
                  }}
                >
                  <div
                    className="px-4 py-3 rounded-2xl mb-3"
                    style={{
                      backgroundColor: "rgba(6, 35, 29, 0.6)",
                      border: "1px solid rgba(162, 203, 25, 0.2)",
                    }}
                  >
                    <span
                      className="text-5xl md:text-7xl font-medium tabular-nums tracking-tight pulse"
                      style={{
                        color: "#A2CB19",
                        fontFamily: "monospace",
                        textShadow: "0 0 30px rgba(162, 203, 25, 0.5)",
                      }}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>

                  <div
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "#D6CECE", opacity: 0.7 }}
                  >
                    {unit.label}
                  </div>

                  {index < timeUnits.length - 1 && (
                    <span
                      className="hidden md:block absolute right-[-1rem] top-5 text-4xl font-medium"
                      style={{ color: "rgba(162, 203, 25, 0.4)" }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes timeFlash {
          0%   { opacity: 0.85; }
          40%  { opacity: 0.5; }
          100% { opacity: 0; }
        }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          );
        }

        .dust-particle {
          position: absolute;
          bottom: -6px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: rgba(162, 203, 25, 0.7);
          animation: dustFloat 5s ease-out forwards;
        }

        @keyframes dustFloat {
          0%   { transform: translateY(0) scale(1);      opacity: 0.8; }
          50%  { transform: translateY(-80px) scale(1.4); opacity: 0.4; }
          100% { transform: translateY(-180px) scale(0);  opacity: 0; }
        }
      `}</style>
    </section>
  );
}