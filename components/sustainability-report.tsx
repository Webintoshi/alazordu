'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Download, FileText } from 'lucide-react';

const ReportPDFViewer = dynamic(
  () => import('@/components/report-pdf-viewer').then((mod) => mod.ReportPDFViewer),
  {
    ssr: false,
    loading: () => <div className="min-h-96 animate-pulse rounded-2xl bg-[var(--color-background-secondary)]" aria-busy="true" />,
  }
);

const reportUrl = '/documents/alaz-otel-surdurulebilirlik-raporu.pdf';

export function SustainabilityReport() {
  const pathname = usePathname();
  const isTr = !pathname.startsWith('/en');

  return (
    <section className="bg-[var(--color-background)] pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-small mb-5 text-[var(--color-accent)]">ALAZ OTEL</p>
          <h1 className="font-display text-3xl leading-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            {isTr ? 'Sürdürülebilirlik' : 'Sustainability'}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body text-[var(--color-foreground-secondary)]">
            {isTr
              ? 'Çevresel etkilerin azaltılması, kaynakların verimli kullanımı, çalışan yaşamı ve kültürel miras konularındaki çalışmalarımızı sürdürülebilirlik raporumuzda inceleyebilirsiniz.'
              : 'Explore our sustainability report to learn about our work on reducing environmental impacts, using resources efficiently, employee wellbeing and cultural heritage.'}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="mb-6 flex flex-col gap-6 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl sm:text-2xl">
                  {isTr ? 'Alaz Otel Sürdürülebilirlik Raporu' : 'Alaz Hotel Sustainability Report'}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-foreground-secondary)]">
                  {isTr ? 'PDF · Türkçe · 9 sayfa · 1,3 MB' : 'PDF · Turkish · 9 pages · 1.3 MB'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-5 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {isTr ? 'PDF’i Aç' : 'Open PDF'}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={reportUrl}
                download="Alaz-Otel-Surdurulebilirlik-Raporu.pdf"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {isTr ? 'Raporu İndir' : 'Download Report'}
              </a>
            </div>
          </div>
          <ReportPDFViewer file={reportUrl} isTr={isTr} />
        </div>
      </div>
    </section>
  );
}
