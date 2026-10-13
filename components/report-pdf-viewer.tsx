'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

export interface ReportViewerProps {
  file: string;
  isTr: boolean;
}

export function ReportPDFViewer({ file, isTr }: ReportViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasError, setHasError] = useState(false);
  const loadingText = isTr ? 'Rapor yükleniyor…' : 'Loading report…';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(1, Math.floor(Math.min(entry.contentRect.width, 900))));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-secondary)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-3 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
          disabled={pageNumber <= 1 || hasError}
          aria-label={isTr ? 'Önceki sayfa' : 'Previous page'}
          className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm hover:bg-[var(--color-background-tertiary)] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{isTr ? 'Önceki' : 'Previous'}</span>
        </button>
        <p className="shrink-0 text-sm" aria-live="polite" aria-atomic="true">
          {isTr ? 'Sayfa' : 'Page'} {pageNumber} / {numPages || '—'}
        </p>
        <button
          type="button"
          onClick={() => setPageNumber((page) => Math.min(numPages, page + 1))}
          disabled={!numPages || pageNumber >= numPages || hasError}
          aria-label={isTr ? 'Sonraki sayfa' : 'Next page'}
          className="inline-flex min-h-11 items-center gap-1 rounded-full bg-[var(--color-accent)] px-3 text-sm text-white hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
        >
          <span className="hidden sm:inline">{isTr ? 'Sonraki' : 'Next'}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="p-3 sm:p-6">
        <div ref={containerRef} className="flex min-h-96 w-full justify-center">
          <Document
            file={file}
            onLoadSuccess={({ numPages: count }) => {
              setNumPages(count);
              setHasError(false);
            }}
            onLoadError={() => setHasError(true)}
            loading={<p className="py-12 text-center text-[var(--color-foreground-secondary)]" role="status">{loadingText}</p>}
            error={
              <p className="max-w-md py-12 text-center text-[var(--color-foreground-secondary)]" role="alert">
                {isTr
                  ? 'Rapor önizlemesi yüklenemedi. Yukarıdaki “PDF’i Aç” veya “Raporu İndir” bağlantısını kullanabilirsiniz.'
                  : 'The preview could not load. Please use “Open PDF” or “Download Report” above.'}
              </p>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={width}
              renderAnnotationLayer={false}
              className="overflow-hidden rounded shadow-sm"
              loading={<p className="py-12 text-center" role="status">{loadingText}</p>}
              error={<p className="py-12 text-center" role="alert">{isTr ? 'Bu sayfa görüntülenemedi. Raporu PDF olarak açabilirsiniz.' : 'This page could not load. You can open the PDF above.'}</p>}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
