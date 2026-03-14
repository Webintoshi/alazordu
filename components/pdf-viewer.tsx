'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

// PDF.js worker'ı yapılandır - yerel dosya
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

export function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    setIsClient(true);
    
    // Responsive scale için container genişliğini izle
    const updateContainerWidth = () => {
      const width = Math.min(window.innerWidth - 48, 1200);
      setContainerWidth(width);
      
      // Ekran boyutuna göre scale ayarla
      if (window.innerWidth < 640) {
        setScale(0.5); // Mobil
      } else if (window.innerWidth < 1024) {
        setScale(0.8); // Tablet
      } else {
        setScale(1.1); // Masaüstü
      }
    };
    
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error('PDF yükleme hatası:', err);
    setError('PDF dosyası yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    setIsLoading(false);
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.4));
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        <div className="w-10 h-10 border-3 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 sm:p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-[var(--color-foreground)] mb-6 text-base sm:text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-full hover:bg-[var(--color-accent-hover)] transition-all hover:scale-105 font-medium"
        >
          Sayfayı Yenile
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-background)]">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-background)] to-[var(--color-background-secondary)]">
        {/* Sol - Zoom Controls */}
        <div className="flex items-center gap-2 bg-[var(--color-background-tertiary)] rounded-full px-2 py-1">
          <button
            onClick={zoomOut}
            className="p-2 rounded-full hover:bg-[var(--color-background)] transition-all active:scale-95"
            title="Uzaklaştır"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-foreground)]" />
          </button>
          <span className="text-xs sm:text-sm font-medium text-[var(--color-foreground)] min-w-[50px] text-center">
            %{Math.round(scale * 100)}
          </span>
          <button
            onClick={zoomIn}
            className="p-2 rounded-full hover:bg-[var(--color-background)] transition-all active:scale-95"
            title="Yakınlaştır"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-foreground)]" />
          </button>
        </div>

        {/* Orta - Sayfa Bilgisi */}
        <div className="flex items-center gap-3 bg-[var(--color-accent)]/10 rounded-full px-4 py-2">
          <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
          <span className="text-sm font-semibold text-[var(--color-accent)]">
            {currentPage} <span className="text-[var(--color-foreground-muted)]">/</span> {numPages || '-'}
          </span>
        </div>

        {/* Sağ - Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className={cn(
              "flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentPage <= 1 
                ? "opacity-30 cursor-not-allowed bg-[var(--color-background-tertiary)]" 
                : "bg-[var(--color-background-tertiary)] hover:bg-[var(--color-accent)] hover:text-white active:scale-95 text-[var(--color-foreground)]"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Önceki</span>
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className={cn(
              "flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentPage >= numPages 
                ? "opacity-30 cursor-not-allowed bg-[var(--color-background-tertiary)]" 
                : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:scale-95 shadow-lg shadow-[var(--color-accent)]/30"
            )}
          >
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Display - Responsive */}
      <div className="relative bg-gradient-to-b from-[var(--color-background-secondary)] to-[var(--color-background-tertiary)] overflow-hidden">
        <div className="flex items-center justify-center min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] p-4 sm:p-6 md:p-8">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-3 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[var(--color-foreground-secondary)]">Menü yükleniyor...</p>
            </div>
          )}
          <Document
            file="/ALAZ%20MEN%C3%9C.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            <div className="relative">
              {/* PDF Shadow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-accent)]/20 via-transparent to-[var(--color-accent)]/20 blur-xl rounded-2xl" />
              <Page
                pageNumber={currentPage}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="relative shadow-2xl rounded-lg overflow-hidden"
                width={containerWidth > 768 ? undefined : containerWidth - 32}
              />
            </div>
          </Document>
        </div>
        
        {/* Gradient Overlays for depth */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[var(--color-background-secondary)] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--color-background-tertiary)] to-transparent pointer-events-none" />
      </div>

      {/* Page Thumbnails - Horizontal Navigation */}
      {numPages > 0 && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300",
                  "w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24",
                  currentPage === pageNum
                    ? "ring-2 sm:ring-3 ring-[var(--color-accent)] shadow-lg scale-105"
                    : "ring-1 ring-[var(--color-border)] opacity-60 hover:opacity-100 hover:ring-[var(--color-accent-hover)]"
                )}
              >
                <Document file="/ALAZ%20MEN%C3%9C.pdf" loading={null}>
                  <Page
                    pageNumber={pageNum}
                    scale={0.12}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={80}
                    height={100}
                  />
                </Document>
              </button>
            ))}
          </div>
          
          {/* Swipe hint for mobile */}
          <p className="text-center text-xs text-[var(--color-foreground-muted)] mt-3 sm:hidden">
            Sayfalar arasında gezinmek için kaydırın
          </p>
        </div>
      )}
    </div>
  );
}
