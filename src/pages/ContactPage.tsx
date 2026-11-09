import { useState, type FormEvent } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { buttonClasses } from '@/components/ui/buttonStyles';
import PageHeader from '@/components/ui/PageHeader';

interface ContactForm {
  name: string;
  contact: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactForm>({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewNotice, setPreviewNotice] = useState(false);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setPreviewNotice(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = t('Please enter your name.', 'لطفاً نام خود را وارد کنید.');
    if (!form.contact.trim()) {
      nextErrors.contact = t('Please enter an email address or phone number.', 'لطفاً ایمیل یا شماره تماس را وارد کنید.');
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = t('Please write at least 10 characters.', 'لطفاً حداقل ۱۰ کاراکتر بنویسید.');
    }
    setErrors(nextErrors);
    setPreviewNotice(Object.keys(nextErrors).length === 0);
  };

  const contactItems = [
    { icon: Mail, label: t('Email', 'ایمیل'), value: t('To be confirmed before launch', 'قبل از راه‌اندازی تأیید می‌شود') },
    { icon: Phone, label: t('Phone', 'تلفن'), value: t('To be confirmed before launch', 'قبل از راه‌اندازی تأیید می‌شود') },
    { icon: Clock, label: t('Support hours', 'ساعات پشتیبانی'), value: t('To be confirmed before launch', 'قبل از راه‌اندازی تأیید می‌شود') },
    { icon: MapPin, label: t('Office', 'دفتر'), value: t('Kabul, Afghanistan', 'کابل، افغانستان') },
  ];

  return (
    <>
      <PageHeader
        title={t('Contact us', 'تماس با ما')}
        description={t(
          'Questions about orders, products, or selling on AfghanBazaar? Send us a message.',
          'سوالی درباره سفارش، محصول یا فروش در افغان بازار دارید؟ پیامی برای ما بفرستید.',
        )}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <form noValidate onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">{t('Send a message', 'ارسال پیام')}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {t('This form is a preview and is not connected to a mailbox yet.', 'این فورم نمایشی است و هنوز به صندوق پیام وصل نشده است.')}
          </p>

          <div className="mt-6 flex flex-col gap-5">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-slate-800">
                {t('Full name', 'نام کامل')}
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={inputClass}
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 text-xs font-semibold text-navy-900">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-details" className="mb-1.5 block text-sm font-semibold text-slate-800">
                {t('Email or phone', 'ایمیل یا تلفن')}
              </label>
              <input
                id="contact-details"
                type="text"
                value={form.contact}
                onChange={(event) => updateField('contact', event.target.value)}
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? 'contact-details-error' : undefined}
                className={inputClass}
              />
              {errors.contact && (
                <p id="contact-details-error" className="mt-1.5 text-xs font-semibold text-navy-900">{errors.contact}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-800">
                {t('Message', 'پیام')}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={inputClass}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs font-semibold text-navy-900">{errors.message}</p>
              )}
            </div>

            {previewNotice && (
              <p role="status" className="rounded-xl bg-gold-50 px-4 py-3 text-sm text-navy-900 ring-1 ring-gold-400">
                {t(
                  'Your message looks complete. Sending is not connected yet, so nothing was delivered in this preview.',
                  'پیام شما کامل است. ارسال هنوز وصل نشده، بنابراین در این نسخه آزمایشی چیزی ارسال نشد.',
                )}
              </p>
            )}

            <button type="submit" className={buttonClasses('primary', 'w-full sm:w-auto sm:self-start')}>
              <Send className="h-4 w-4" aria-hidden="true" />
              {t('Send message', 'ارسال پیام')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
