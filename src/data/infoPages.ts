import type { LocalizedText } from '@/types/marketplace';

export type InfoPageSlug = 'help' | 'terms' | 'privacy';

interface InfoSection {
  heading: LocalizedText;
  body: LocalizedText;
}

interface InfoPage {
  title: LocalizedText;
  intro: LocalizedText;
  sections: InfoSection[];
}

export const INFO_PAGES: Record<InfoPageSlug, InfoPage> = {
  help: {
    title: { en: 'Help and support', prs: 'کمک و پشتیبانی' },
    intro: {
      en: 'Answers to common questions about shopping on AfghanBazaar.',
      prs: 'پاسخ به سوالات متداول درباره خرید از افغان بازار.',
    },
    sections: [
      {
        heading: { en: 'Official store or independent seller?', prs: 'فروشگاه رسمی یا فروشنده مستقل؟' },
        body: {
          en: 'Every product shows a label. Official store products are sold by AfghanBazaar. Independent seller products are sold by local businesses.',
          prs: 'هر محصول برچسب دارد. محصولات فروشگاه رسمی توسط افغان بازار فروخته می‌شوند. محصولات فروشندگان مستقل توسط کسب‌وکارهای محلی فروخته می‌شوند.',
        },
      },
      {
        heading: { en: 'Is checkout available?', prs: 'آیا خرید آنلاین فعال است؟' },
        body: {
          en: 'Not yet. This preview lets you browse and save your cart. Payments and orders will be added in a later phase.',
          prs: 'هنوز نه. این نسخه آزمایشی امکان مرور و ذخیره سبد خرید را می‌دهد. پرداخت و سفارش در مرحله بعدی اضافه می‌شوند.',
        },
      },
    ],
  },
  terms: {
    title: { en: 'Terms of use', prs: 'شرایط استفاده' },
    intro: {
      en: 'The rules for using this website during the preview period.',
      prs: 'قوانین استفاده از این وب‌سایت در دوره نمایشی.',
    },
    sections: [
      {
        heading: { en: 'Preview content', prs: 'محتوای نمایشی' },
        body: {
          en: 'Products, prices, and seller names shown on this site are demonstration data and do not represent real offers.',
          prs: 'محصولات، قیمت‌ها و نام فروشندگان نشان‌داده‌شده در این سایت داده‌های نمایشی هستند و پیشنهاد واقعی نیستند.',
        },
      },
      {
        heading: { en: 'Accounts', prs: 'حساب‌های کاربری' },
        body: {
          en: 'Sign-in and registration are not active in this preview. Full terms will be published before accounts open.',
          prs: 'ورود و ثبت‌نام در این نسخه فعال نیستند. شرایط کامل قبل از فعال شدن حساب‌ها منتشر می‌شود.',
        },
      },
    ],
  },
  privacy: {
    title: { en: 'Privacy policy', prs: 'سیاست حریم خصوصی' },
    intro: {
      en: 'How AfghanBazaar handles information during the preview period.',
      prs: 'چگونگی برخورد افغان بازار با معلومات در دوره نمایشی.',
    },
    sections: [
      {
        heading: { en: 'Data stored on your device', prs: 'معلومات ذخیره‌شده در دستگاه شما' },
        body: {
          en: 'Your cart, wishlist, and language choice are saved in your browser only. They are not sent to a server in this preview.',
          prs: 'سبد خرید، لیست علاقه‌مندی و انتخاب زبان شما فقط در مرورگر ذخیره می‌شوند و در این نسخه به سرور فرستاده نمی‌شوند.',
        },
      },
      {
        heading: { en: 'Contact form', prs: 'فورم تماس' },
        body: {
          en: 'Messages sent through the contact form are not delivered in this preview and are not stored.',
          prs: 'پیام‌های ارسال‌شده از طریق فورم تماس در این نسخه تحویل یا ذخیره نمی‌شوند.',
        },
      },
    ],
  },
};
