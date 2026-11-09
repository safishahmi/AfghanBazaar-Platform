import { useLanguage } from '@/i18n/useLanguage';
import { INFO_PAGES, type InfoPageSlug } from '@/data/infoPages';
import PageHeader from '@/components/ui/PageHeader';
import NotFoundPage from './NotFoundPage';

interface InfoPageProps {
  slug: string;
}

function isInfoPageSlug(value: string): value is InfoPageSlug {
  return Object.prototype.hasOwnProperty.call(INFO_PAGES, value);
}

export default function InfoPage({ slug }: InfoPageProps) {
  const { tx } = useLanguage();

  if (!isInfoPageSlug(slug)) return <NotFoundPage />;

  const content = INFO_PAGES[slug];

  return (
    <>
      <PageHeader title={tx(content.title)} description={tx(content.intro)} />
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        {content.sections.map((section) => (
          <section key={section.heading.en}>
            <h2 className="text-xl font-bold text-slate-900">{tx(section.heading)}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{tx(section.body)}</p>
          </section>
        ))}
      </article>
    </>
  );
}
