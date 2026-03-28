"use client";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

export function SecuritySection() {
  const t = useTranslations();

  const securityItems = [
    { image: '/check.png', titleKey: 'security.item1.title', descKey: 'security.item1.description' },
    { image: '/bank.png', titleKey: 'security.item2.title', descKey: 'security.item2.description' },
    { image: '/security.png', titleKey: 'security.item3.title', descKey: 'security.item3.description' },
    { image: '/view.png', titleKey: 'security.item4.title', descKey: 'security.item4.description' },
  ];

  // Variantes para las tarjetas: las pares vienen de la derecha, las impares de la izquierda
  const itemVariants: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80, // Alterna dirección
      scale: 0.95
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-24 px-6 overflow-hidden" style={{ backgroundColor: '#D6CECE' }}>
      <div className="max-w-6xl mx-auto">
        {/* Título animado con entrada desde arriba */}
        <motion.h2
          className="text-4xl md:text-6xl font-medium text-center mb-20 uppercase tracking-tight"
          style={{ color: '#06231D' }}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('security.title')}
        </motion.h2>

        {/* Security Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {securityItems.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
                borderColor: "#06231D"
              }}
              className="p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center md:items-start gap-6 transition-colors duration-300"
              style={{
                backgroundColor: 'white',
                border: '1px solid #3B6152',
              }}
            >
              {/* Icono animado (gira un poco al entrar) */}
              <motion.div 
                className="shrink-0"
                initial={{ rotate: -20, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-20 h-20 object-contain"
                />
              </motion.div>

              <div className="text-center md:text-left">
                <h3
                  className="text-2xl font-medium mb-3"
                  style={{ color: '#06231D' }}
                >
                  {t(item.titleKey)}
                </h3>
                <p
                  className="leading-relaxed text-base"
                  style={{ color: '#3B6152' }}
                >
                  {t(item.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}