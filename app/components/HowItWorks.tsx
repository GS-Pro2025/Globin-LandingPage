"use client";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations();

  const steps = [
    { number: '01', titleKey: 'how.step1.title', descKey: 'how.step1.description' },
    { number: '02', titleKey: 'how.step2.title', descKey: 'how.step2.description' },
    { number: '03', titleKey: 'how.step3.title', descKey: 'how.step3.description' },
  ];

  return (
    <section className="py-20 px-6 bg-[#005242]/70">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ color: '#A2CB19' }}
        >
          {t('how.title')}
        </h2>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden md:block absolute top-16 left-full w-full h-1"
                  style={{
                    background: 'linear-gradient(to right, #A2CB19 0%, rgba(162, 203, 25, 0.3) 100%)',
                    transform: 'translateX(0)',
                    zIndex: 0,
                  }}
                ></div>
              )}

              <div className="relative z-10">
                {/* Number */}
                <div 
                  className="text-7xl font-bold mb-6"
                  style={{ 
                    color: '#A2CB19',
                    fontFamily: 'monospace',
                    textShadow: '0 0 30px rgba(162, 203, 25, 0.3)',
                  }}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#D6CECE' }}
                >
                  {t(step.titleKey)}
                </h3>

                {/* Description */}
                <p 
                  className="leading-relaxed"
                  style={{ color: '#D6CECE', opacity: 0.8 }}
                >
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
