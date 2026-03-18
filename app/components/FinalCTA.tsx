"use client";
import { useTranslations } from "next-intl";

export function FinalCTA() {
  const t = useTranslations();

  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#A2CB19' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 
          className="text-4xl md:text-6xl font-bold mb-6"
          style={{ color: '#06231D' }}
        >
          {t('finalcta.headline')}
        </h2>

        {/* Subtext */}
        <p 
          className="text-xl md:text-2xl mb-10"
          style={{ color: '#06231D', opacity: 0.8 }}
        >
          {t('finalcta.subtext')}
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToBeta}
          className="px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 mb-6"
          style={{
            backgroundColor: '#06231D',
            color: '#A2CB19',
            boxShadow: '0 10px 40px rgba(6, 35, 29, 0.3)',
          }}
        >
          {t('finalcta.button')}
        </button>

        {/* Disclaimer */}
        <p 
          className="text-sm"
          style={{ color: '#06231D', opacity: 0.7 }}
        >
          {t('finalcta.disclaimer')}
        </p>
      </div>
    </section>
  );
}
