interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <section className="flex flex-col items-center px-2 pt-16 pb-10 text-center sm:pt-24 sm:pb-12">
      <span className="mb-4 inline-block rounded-full border-2 border-multroid-blue/30 bg-multroid-blue/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-multroid-blue backdrop-blur-sm sm:mb-5 sm:px-5 sm:py-2 sm:text-sm">
        {badge}
      </span>
      <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-multroid-dark sm:text-4xl lg:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-multroid-grey sm:mt-5 sm:text-lg">
          {subtitle}
        </p>
      )}
    </section>
  );
}
