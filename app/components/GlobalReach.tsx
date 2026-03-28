"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

  // --- VARIANTES CON TIPADO PARA EVITAR ERRORES DE TS ---
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Equivalente a easeOut pero más robusto para TS
      },
    }),
  };

  const flagVariants: Variants = {
    hidden: { scale: 0, rotate: -45, y: -40 },
    visible: (i: number) => ({
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        delay: (i * 0.2) + 0.5, // Aparece justo después de la carta
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  return (
    <section className="relative py-32 px-6 min-h-screen flex items-center overflow-hidden bg-[#005242]/40">
      {/* Fondo con Parallax suave */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.2, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Image
          src="/bg2.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="relative max-w-6xl mx-auto z-10 w-full">
        {/* Título Principal */}
        <motion.h2 
          className="text-4xl md:text-7xl font-medium text-center mb-36 tracking-tighter uppercase"
          style={{ color: '#C4F04D' }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          {t('global.title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-32">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="group relative p-10 rounded-[3rem] flex flex-col pt-24"
              style={{
                backgroundColor: 'rgba(0, 60, 48, 0.9)', 
                border: '1px solid rgba(196, 240, 77, 0.15)',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Resplandor (Glow) en Hover */}
              <div className="absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10"
                   style={{ backgroundColor: 'rgba(196, 240, 77, 0.08)' }} />

              {/* Banderas con efecto POP */}
              <motion.div 
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-36 h-36"
                custom={index}
                variants={flagVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <div className="relative w-full h-full p-5 rounded-full bg-[#005242] border-[5px] shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(196,240,77,0.4)] group-hover:scale-105"
                     style={{ borderColor: '#C4F04D' }}>
                  <Image
                    src={region.image}
                    alt={region.imageAlt}
                    width={140}
                    height={140}
                    className="object-contain w-full h-full"
                  />
                </div>
              </motion.div>

              {/* Contenido Texto */}
              <div className="text-center flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-medium mb-6 uppercase tracking-tight"
                    style={{ color: '#C4F04D' }}>
                  {t(region.nameKey)}
                </h3>

                <p className="text-white/70 leading-relaxed mb-10 text-base flex-grow">
                  {t(region.banksKey)}
                </p>

                {/* Botón/Badge */}
                <motion.div 
                  className="flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all"
                        style={{ 
                          backgroundColor: '#C4F04D', 
                          color: '#005242'
                        }}>
                    {t(region.providerKey)}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}