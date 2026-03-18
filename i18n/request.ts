import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import esMessages from '../messages/es.json';
const locales = ['en', 'es','pt'];
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale)) {
    locale = 'en';
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default as typeof esMessages
  };
});