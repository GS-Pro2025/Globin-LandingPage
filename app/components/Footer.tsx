"use client";
import { Instagram, Linkedin } from 'lucide-react';
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations();

  // Definimos los iconos manualmente para asegurar que todos tengan el mismo ViewBox y estilo
  const socialLinks = [
    { 
      label: 'Instagram', 
      href: '#',
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      )
    },
    { 
      label: 'TikTok', 
      href: '#',
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
      )
    },
    { 
      label: 'X', 
      href: '#',
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768m2.46-2.46L20 4" opacity="0.5"/><path d="M4 20l16-16"/></svg>
      )
    },
    { 
      label: 'LinkedIn', 
      href: '#',
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
      )
    },
  ];

  const navLinks = [
    { textKey: 'footer.nav.features', href: '#features' },
    { textKey: 'footer.nav.beta', href: '#beta' },
    { textKey: 'footer.nav.security', href: '#security' },
    { textKey: 'footer.nav.contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-20 px-6 overflow-hidden" style={{ backgroundColor: '#03120F' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          
          {/* LOGO PNG */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="shrink-0"
          >
            <Image 
              src="/globinlogo.png" 
              alt="Globin Logo" 
              width={140} 
              height={40} 
              className="object-contain brightness-110"
            />
          </motion.div>

          {/* NAVEGACIÓN CENTRAL */}
          <nav className="flex flex-wrap justify-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium transition-all hover:text-[#C4F04D]"
                style={{ color: '#D6CECE' }}
              >
                {t(link.textKey)}
              </a>
            ))}
          </nav>

          {/* REDES SOCIALES ESTANDARIZADAS */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all border group"
                style={{ 
                  backgroundColor: 'rgba(196, 240, 77, 0.03)',
                  borderColor: 'rgba(196, 240, 77, 0.15)',
                  color: '#A2CB19'
                }}
              >
                <social.icon className="w-5 h-5 group-hover:text-[#C4F04D] transition-colors" />
                
                {/* Overlay de brillo en hover */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md -z-10"
                  style={{ backgroundColor: 'rgba(196, 240, 77, 0.2)' }}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* LÍNEA FINAL */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" 
             style={{ borderColor: 'rgba(59, 97, 82, 0.3)' }}>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#3B6152' }}>
            &copy; {new Date().getFullYear()} GLOBIN — {t('footer.copyright')}
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-xs uppercase hover:text-[#C4F04D] transition-colors" style={{ color: '#3B6152' }}>
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-xs uppercase hover:text-[#C4F04D] transition-colors" style={{ color: '#3B6152' }}>
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}