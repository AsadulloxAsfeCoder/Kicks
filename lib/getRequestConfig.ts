// lib/getRequestConfig.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import type { RequestConfig } from 'next-intl/server';

const supportedLocales = ['uz', 'ru', 'en'] as const;
type SupportedLocale = typeof supportedLocales[number];

async function loadMessages(locale: SupportedLocale) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    throw error;
  }
}

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  if (!locale || !supportedLocales.includes(locale as SupportedLocale)) {
    console.log(`Unsupported locale detected: ${locale}`);
    notFound();
  }

  const messages = await loadMessages(locale as SupportedLocale);

  return {
    locale,
    messages,
    now: new Date(),
    timeZone: 'Asia/Tashkent'
  };
});
