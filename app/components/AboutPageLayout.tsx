import { SubNavigation, ContentNavigation, ContentNavigationScript } from "@canopy-iiif/app/ui/server";

interface AboutPageLayoutProps {
  children: React.ReactNode;
}

export default function AboutPageLayout({ children }: AboutPageLayoutProps) {
  return (
    <>
      <ContentNavigationScript />
      <div className="about-page">
        <aside className="about-page__sidebar">
          <details className="about-menu-details" open>
            <summary className="about-menu-summary" />
            <SubNavigation className="about-nav" />
          </details>
          <details className="about-toc-details" open>
            <summary className="about-toc-summary" />
            <ContentNavigation className="about-content-nav" />
          </details>
        </aside>
        <main className="about-page__content">{children}</main>
      </div>
    </>
  );
}
