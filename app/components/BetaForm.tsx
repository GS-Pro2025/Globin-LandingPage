"use client";
import { useState, useEffect, useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import Image from "next/image";
export function BetaForm() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    useCase: '',
    referral: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Beta form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <section id="beta" className="py-10 px-4" style={{ backgroundColor: 'rgba(6, 35, 29, 0.85)' }}>
        <div className="max-w-lg mx-auto">
          <div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: '#005242', border: '1px solid #3B6152' }}
          >
            <div
              className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(162, 203, 25, 0.2)', border: '2px solid #A2CB19' }}
            >
              <Check size={28} style={{ color: '#A2CB19' }} strokeWidth={3} />
            </div>
            <p className="text-xl font-medium" style={{ color: '#A2CB19' }}>
              {t('beta.success')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const inputStyle = {
    backgroundColor: '#06231D',
    border: '1px solid #3B6152',
    color: '#D6CECE',
  };

  return (
    <section
      ref={sectionRef}
      id="beta"
      className="py-10 md:py-14 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'rgba(6, 35, 29, 0.82)' }}
    >
      {/* Glow fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(162, 203, 25, 0.08) 0%, transparent 70%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />

      <div className="max-w-xl mx-auto relative z-10">

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {[t('beta.perk1'), t('beta.perk2'), t('beta.perk3')].map((perk, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{
                backgroundColor: 'rgba(162, 203, 25, 0.1)',
                border: '1px solid rgba(162, 203, 25, 0.3)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
              }}
            >
              <Image
        src="/moneda.svg"
        alt=""
        width={16}
        height={16}
      />
              <span className="text-xs font-medium" style={{ color: '#A2CB19' }}>{perk}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          className="p-6 md:p-8 rounded-2xl"
          style={{
            backgroundColor: 'rgba(0, 82, 66, 0.9)',
            border: '1px solid #3B6152',
            backdropFilter: 'blur(12px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {/* Eyebrow */}
          <span className="text-xs font-medium tracking-widest" style={{ color: '#A2CB19' }}>
            {t('beta.eyebrow')}
          </span>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-medium mt-2 mb-2" style={{ color: '#D6CECE' }}>
            {t('beta.title')}
          </h2>
          <h2 className="text-2xl md:text-3xl font-medium mt-2 mb-2" style={{ color: '#D6CECE' }}>
            {t('beta.titles')}
          </h2>
          {/* Subtitle */}
          <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: '#D6CECE', opacity: 0.7 }}>
            {t('beta.subtitle')}
          </p>

          {/* Form — 2 columnas en desktop */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Name + Email en fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
                }}
              >
                <label htmlFor="name" className="block text-xs font-medium mb-1.5" style={{ color: '#D6CECE' }}>
                  {t('beta.field.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#A2CB19')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#3B6152')}
                />
              </div>

              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s',
                }}
              >
                <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: '#D6CECE' }}>
                  {t('beta.field.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#A2CB19')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#3B6152')}
                />
              </div>
            </div>

            {/* Country + UseCase en fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s',
                }}
              >
                <label htmlFor="country" className="block text-xs font-medium mb-1.5" style={{ color: '#D6CECE' }}>
                  {t('beta.field.country')}
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#A2CB19')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#3B6152')}
                >
                  <option value="">—</option>
                  <optgroup label="North America">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="MX">Mexico</option>
                  </optgroup>
                  <optgroup label="Europe">
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="NL">Netherlands</option>
                  </optgroup>
                  <optgroup label="Latin America">
                    <option value="CO">Colombia</option>
                    <option value="BR">Brazil</option>
                    <option value="AR">Argentina</option>
                    <option value="CL">Chile</option>
                    <option value="PE">Peru</option>
                  </optgroup>
                </select>
              </div>

              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s',
                }}
              >
                <label htmlFor="useCase" className="block text-xs font-medium mb-1.5" style={{ color: '#D6CECE' }}>
                  {t('beta.field.usecase')}
                </label>
                <select
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#A2CB19')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#3B6152')}
                >
                  <option value="">—</option>
                  <option value="budgeting">{t('beta.usecase.budgeting')}</option>
                  <option value="family">{t('beta.usecase.family')}</option>
                  <option value="multicurrency">{t('beta.usecase.multicurrency')}</option>
                  <option value="savings">{t('beta.usecase.savings')}</option>
                </select>
              </div>
            </div>

            {/* Referral */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.5s ease 0.8s, transform 0.5s ease 0.8s',
              }}
            >
              <label htmlFor="referral" className="block text-xs font-medium mb-1.5" style={{ color: '#D6CECE' }}>
                {t('beta.field.referral')}
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#A2CB19')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#3B6152')}
              />
            </div>

            {/* Submit */}
            <div
              className="pt-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 1s, transform 0.6s ease 1s',
              }}
            >
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium text-base transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#A2CB19',
                  color: '#06231D',
                  boxShadow: '0 0 40px rgba(162, 203, 25, 0.3)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 60px rgba(162, 203, 25, 0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 40px rgba(162, 203, 25, 0.3)')}
              >
                {t('beta.button')}
              </button>

              <p className="text-center text-xs mt-3 text-[#98dabc]">
                {t('beta.disclaimer')}
              </p>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}