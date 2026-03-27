"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function GlobalReach() {
  const t = useTranslations();

  const regions = [
    {
      image: '/us.png',
      imageAlt: 'United States',
      nameKey: 'global.us.label',
      banksKey: 'global.us.banks',
      providerKey: 'global.us.provider',
    },
    {
      image: '/eu.png',
      imageAlt: 'European Union',
      nameKey: 'global.eu.label',
      banksKey: 'global.eu.banks',
      providerKey: 'global.eu.provider',
    },
    {
      image: '/latam.png',
      imageAlt: 'Latin America',
      nameKey: 'global.latam.label',
      banksKey: 'global.latam.banks',
      providerKey: 'global.latam.provider',
    },
  ];

  return (
    <section className="relative py-24 px-6 min-h-screen flex items-center overflow-hidden bg-[#005242]/50">
      {/* Imagen de fondo con baja opacidad para textura */}
      <Image
        src="/bg2.jpg"
        alt="Background"
        fill
        className="object-cover -z-10"
      />

      <div className="relative max-w-6xl mx-auto z-10 w-full">
        {/* Título con el verde claro principal */}
        <h2 className="text-3xl md:text-6xl font-medium text-center mb-32 tracking-tighter uppercase"
            style={{ color: '#C4F04D' }}>
          {t('global.title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-24">
          {regions.map((region, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2.5rem] flex flex-col pt-20 transition-all duration-500 hover:-translate-y-2"
              style={{
                backgroundColor: 'rgba(0, 82, 66, 0.8)', 
                border: '2px solid rgba(196, 240, 77, 0.1)', 
              }}
            >
              <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                   style={{ backgroundColor: 'rgba(196, 240, 77, 0.05)' }} />

              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32">
                <div className="relative w-full h-full p-4 rounded-full bg-[#005242] border-4 shadow-[0_0_20px_rgba(196,240,77,0.3)] group-hover:shadow-[0_0_30px_rgba(196,240,77,0.5)] transition-all duration-500"
                     style={{ borderColor: '#C4F04D' }}>
                  <Image
                    src={region.image}
                    alt={region.imageAlt}
                    width={128}
                    height={128}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Contenido */}
              <h3 className="text-2xl font-medium mb-4 text-center uppercase tracking-tight"
                  style={{ color: '#C4F04D' }}>
                {t(region.nameKey)}
              </h3>

              <p className="text-white/80 text-center leading-relaxed mb-8 flex-grow">
                {t(region.banksKey)}
              </p>

              {/* Badge Estilo Botón */}
              <div className="flex justify-center">
                <span className="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors"
                      style={{ 
                        backgroundColor: '#C4F04D', 
                        color: '#005242' 
                      }}>
                  {t(region.providerKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}