"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HowItWorks() {
  const t = useTranslations();

  const steps = [
    { number: '01', titleKey: 'how.step1.title', descKey: 'how.step1.description' },
    { number: '02', titleKey: 'how.step2.title', descKey: 'how.step2.description' },
    { number: '03', titleKey: 'how.step3.title', descKey: 'how.step3.description' },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#005242]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* --- LADO IZQUIERDO: TEXTO Y PASOS --- */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          {/* Título de Sección */}
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl  font-medium  tracking-tighter uppercase mb-4"
                style={{ color: '#C4F04D' }}>
              {t('how.title')}
            </h2>
            <div className="w-24 h-1.5 rounded-full mx-auto lg:mx-0" 
                 style={{ backgroundColor: '#C4F04D', boxShadow: '0 0 15px #C4F04D' }} 
            />
          </div>

          {/* Lista de Pasos (Sin imágenes internas) */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group relative flex items-center gap-6 p-8 rounded-[2rem] transition-all duration-500 hover:bg-white/5 border border-transparent hover:border-[#C4F04D]/20"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Número Neón Lateral */}
                <div className="shrink-0 flex flex-col items-center">
                  <span className="text-5xl font-black italic transition-all duration-500 group-hover:scale-110"
                        style={{ 
                          color: '#C4F04D',
                          textShadow: '0 0 20px rgba(196, 240, 77, 0.3)'
                        }}>
                    {step.number}
                  </span>
                </div>

                {/* Contenido del Paso */}
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-medium uppercase tracking-tight mb-2"
                      style={{ color: '#C4F04D' }}>
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-md">
                    {t(step.descKey)}
                  </p>
                </div>

                {/* Flecha decorativa que aparece en Hover */}
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4F04D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- LADO DERECHO: LA ÚNICA IMAGEN --- */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative group">
          {/* Brillo de fondo (Glow) */}
          <div 
            className="absolute -inset-10 blur-[100px] opacity-20 rounded-full animate-pulse"
            style={{ backgroundColor: '#C4F04D' }}
          />
          
          <div className="relative  overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]"
              >
            <Image
              src="/gl2.png" 
              alt="Plataforma tecnológica"
              width={550}
              height={600}
              className="object-cover"
              priority
            />
           
          </div>

          {/* Elemento flotante decorativo sobre la imagen */}
          <div className="absolute -bottom-6 -left-6 p-6 rounded-3xl border border-[#C4F04D]/30 backdrop-blur-xl hidden lg:block"
               style={{ backgroundColor: 'rgba(0, 82, 66, 0.8)' }}>
             <p className="text-[#C4F04D] font-medium text-xs uppercase tracking-widest">{t('how.badge')}</p>
          </div>
        </div>

      </div>
    </section>
  );
}