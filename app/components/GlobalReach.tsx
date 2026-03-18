"use client";
import { useTranslations } from "next-intl";

export function GlobalReach() {
  const t = useTranslations();

  const regions = [
    {
      emoji: '🇺🇸',
      nameKey: 'global.us.label',
      banksKey: 'global.us.banks',
      providerKey: 'global.us.provider',
    },
    {
      emoji: '🇪🇺',
      nameKey: 'global.eu.label',
      banksKey: 'global.eu.banks',
      providerKey: 'global.eu.provider',
    },
    {
      emoji: '🌎',
      nameKey: 'global.latam.label',
      banksKey: 'global.latam.banks',
      providerKey: 'global.latam.provider',
    },
  ];

  return (
    <section
      className="py-20 px-6 min-h-screen flex items-center"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/bg2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(6, 35, 29, 0.52)',
        }}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ color: '#D6CECE' }}
        >
          {t('global.title')}
        </h2>

        {/* Region Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl"
              style={{
                backgroundColor: 'rgba(0, 82, 66, 0.65)',
                border: '1px solid #3B6152',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Emoji */}
              <div className="text-5xl mb-4">
                {region.emoji}
              </div>

              {/* Region Name */}
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: '#D6CECE' }}
              >
                {t(region.nameKey)}
              </h3>

              {/* Banks */}
              <p
                className="mb-4 leading-relaxed"
                style={{ color: '#D6CECE', opacity: 0.8 }}
              >
                {t(region.banksKey)}
              </p>

              {/* Provider Badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: 'rgba(162, 203, 25, 0.15)',
                  color: '#A2CB19',
                  border: '1px solid rgba(162, 203, 25, 0.3)',
                }}
              >
                {t(region.providerKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}