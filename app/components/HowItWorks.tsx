"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function HowItWorks() {
  const t = useTranslations();

  const steps = [
    { number: '01', titleKey: 'how.step1.title', descKey: 'how.step1.description' },
    { number: '02', titleKey: 'how.step2.title', descKey: 'how.step2.description' },
    { number: '03', titleKey: 'how.step3.title', descKey: 'how.step3.description' },
  ];

  // Variantes para los pasos: Entrada con "magnificación" y rebote
  const stepVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 120, // Más nervioso/dinámico
        damping: 12
      }
    })
  };

  return (
    <section className="relative py-24 px-6 bg-[#005242]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* --- LADO IZQUIERDO: TEXTO Y PASOS --- */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          
          <motion.div 
            className="mb-12 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase mb-4"
                style={{ color: '#C4F04D' }}>
              {t('how.title')}
            </h2>
            <motion.div 
              className="w-24 h-1.5 rounded-full mx-auto lg:mx-0" 
              style={{ backgroundColor: '#C4F04D', boxShadow: '0 0 20px #C4F04D' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </motion.div>

          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ 
                  scale: 1.02, 
                  x: 10,
                  backgroundColor: 'rgba(196, 240, 77, 0.05)' 
                }}
                className="group relative flex items-center gap-6 p-8 rounded-[2rem] border border-white/5 hover:border-[#C4F04D]/30 transition-colors duration-300"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}
              >
                <div className="shrink-0">
                  <motion.span 
                    className="text-5xl font-black italic block"
                    style={{ color: '#C4F04D', textShadow: '0 0 15px rgba(196, 240, 77, 0.4)' }}
                    whileHover={{ rotate: -10, scale: 1.2 }}
                  >
                    {step.number}
                  </motion.span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-medium uppercase tracking-tight mb-2"
                      style={{ color: '#C4F04D' }}>
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-md">
                    {t(step.descKey)}
                  </p>
                </div>

                <motion.div 
                  className="hidden md:block opacity-0 group-hover:opacity-100"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4F04D" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- LADO DERECHO: IMAGEN --- */}
        <motion.div 
          className="w-full lg:w-1/2 order-1 lg:order-2 relative"
          initial={{ opacity: 0, scale: 0.3, rotate: 15 }} 
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ 
            type: "spring", 
            stiffness: 50, 
            damping: 15,
            duration: 1.2 
          }}
        >
          {/* Resplandor Detrás (Glow) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] blur-[120px] rounded-full opacity-20"
            style={{ backgroundColor: '#C4F04D' }}
          />
          
          <motion.div 
            className="relative z-10"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 1, 0, -1, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image
              src="/gl2.png" 
              alt="Plataforma tecnológica"
              width={550}
              height={600}
              className="object-cover drop-shadow-[0_0_50px_rgba(196,240,77,0.15)]"
              priority
            />
          </motion.div>

          {/* Badge Flotante con entrada retardada */}
          <motion.div 
            className="absolute -bottom-6 -left-6 p-6 rounded-3xl border border-[#C4F04D]/30 backdrop-blur-xl hidden lg:block z-20 shadow-2xl"
            style={{ backgroundColor: 'rgba(0, 82, 66, 0.95)' }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
             <p className="text-[#C4F04D] font-medium text-xs uppercase tracking-widest">
               {t('how.badge')}
             </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}