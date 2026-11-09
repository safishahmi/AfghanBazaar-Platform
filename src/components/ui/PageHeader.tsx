interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p>}
      </div>
    </header>
  );
}
