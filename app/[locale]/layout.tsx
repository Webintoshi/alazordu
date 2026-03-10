import { ReactNode } from 'react';

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* GitHub Pages SPA redirect handler */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var redirect = sessionStorage.redirect;
              delete sessionStorage.redirect;
              if (redirect && redirect !== location.href) {
                history.replaceState(null, null, redirect);
              }
            })();
          `,
        }}
      />
      {children}
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}
