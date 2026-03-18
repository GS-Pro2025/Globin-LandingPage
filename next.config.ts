import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Si usas Turbopack, a veces ayuda desactivarlo temporalmente para debug
  // transpilePackages: ['next-intl'] 
};

export default withNextIntl(nextConfig);