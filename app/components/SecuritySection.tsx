"use client";
import { useTranslations } from "next-intl";
import { Lock, Building, Check, Eye } from 'lucide-react';

export function SecuritySection() {
  const t = useTranslations();

  const securityItems = [
    { icon: Lock, titleKey: 'security.item1.title', descKey: 'security.item1.description' },
    { icon: Building, titleKey: 'security.item2.title', descKey: 'security.item2.description' },
    { icon: Check, titleKey: 'security.item3.title', descKey: 'security.item3.description' },
    { icon: Eye, titleKey: 'security.item4.title', descKey: 'security.item4.description' },
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#D6CECE' }}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ color: '#06231D' }}
        >
          {t('security.title')}
        </h2>

        {/* Security Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {securityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #3B6152',
                }}
              >
                <div className="mb-6">
                  <Icon 
                    size={40} 
                    style={{ color: '#005242' }} 
                    strokeWidth={2}
                  />
                </div>
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: '#06231D' }}
                >
                  {t(item.titleKey)}
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: '#3B6152' }}
                >
                  {t(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
