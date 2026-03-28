"use client";
import { useTranslations } from "next-intl";
import { motion, useMotionValue } from "framer-motion";

export function FinalCTA() {
  const t = useTranslations();

  // Control de posición del mouse para el efecto de brillo interno del botón
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative py-32 px-6 overflow-hidden" 
      style={{ backgroundColor: '#C4F04D' }}
    >
      {/* Decoración de fondo: Círculos ambientales */}
      <motion.div 
        className="absolute top-0 left-0 w-72 h-72 rounded-full blur-[120px] opacity-40"
        style={{ backgroundColor: '#A2CB19' }}
        animate={{ x: [-20, 40, -20], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Título */}
        <motion.h2 
          className="text-5xl md:text-7xl font-medium mb-8 tracking-tighter uppercase leading-tight"
          style={{ color: '#06231D' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t('finalcta.headline')}
        </motion.h2>

        {/* Subtexto */}
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium"
          style={{ color: '#06231D', opacity: 0.85 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {t('finalcta.subtext')}
        </motion.p>

        {/* Botón con Avión de Papel */}
        <div className="flex flex-col items-center">
          <motion.button
            onMouseMove={handleMouseMove}
            onClick={scrollToBeta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-6 rounded-2xl font-bold text-xl md:text-2xl uppercase tracking-widest overflow-hidden shadow-[0_20px_50px_rgba(6,35,29,0.25)]"
            style={{
              backgroundColor: '#06231D',
              color: '#C4F04D',
            }}
          >
            {/* Brillo radial dinámico */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle 120px at ${mouseX}px ${mouseY}px, #C4F04D, transparent)`,
              }}
            />
            
            <span className="relative z-10 flex items-center gap-4">
              {t('finalcta.button')}
              
              {/* Icono de Avión de Papel Animado */}
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ x: 0, y: 0 }}
                whileHover={{ 
                  x: [0, 5, 40], 
                  y: [0, -5, -40], 
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.6, ease: "easeIn" }}
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </motion.svg>
            </span>
          </motion.button>

          {/* Disclaimer */}
          <motion.p 
            className="text-sm mt-8 font-medium tracking-wide"
            style={{ color: '#06231D', opacity: 0.6 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
          >
            {t('finalcta.disclaimer')}
          </motion.p>
        </div>
      </div>

      {/* Grid sutil de fondo para textura */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: `linear-gradient(#06231D 1px, transparent 1px), linear-gradient(90deg, #06231D 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
    </section>
  );
}