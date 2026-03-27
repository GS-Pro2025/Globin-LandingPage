"use client";
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from "next-intl";
export function Footer() {
  const t = useTranslations();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const navLinks = [
    { textKey: 'footer.nav.features', href: '#features' },
    { textKey: 'footer.nav.beta', href: '#beta' },
    { textKey: 'footer.nav.security', href: '#security' },
    { textKey: 'footer.nav.contact', href: '#contact' },
  ];

  return (
    <footer className="py-16 px-6" style={{ backgroundColor: '#06231D' }}>
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left: Logo & Tagline */}
          <div>
            <h2 className="text-3xl font-medium mb-3" style={{ color: '#A2CB19' }}>
              {t('nav.title')}
            </h2>
            <p 
              className="text-sm"
              style={{ color: '#3B6152' }}
            >
              {t('footer.tagline')}
            </p>
          </div>

          {/* Center: Nav Links */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm transition-colors duration-300"
                style={{ color: '#D6CECE' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#A2CB19')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#D6CECE')}
              >
                {t(link.textKey)}
              </a>
            ))}
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-4 md:justify-end">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                  style={{ color: '#3B6152' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A2CB19')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3B6152')}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: '#3B6152' }}
        >
          {/* Legal Links */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm transition-colors duration-300"
              style={{ color: '#3B6152' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#A2CB19')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#3B6152')}
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-sm transition-colors duration-300"
              style={{ color: '#3B6152' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#A2CB19')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#3B6152')}
            >
              {t('footer.terms')}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: '#3B6152' }}>
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
