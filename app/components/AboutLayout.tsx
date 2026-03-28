import { SubNavigation } from "@canopy-iiif/app/ui/server";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="about-index">
      <header className="about-index__header">
        <div className="about-index__header-nav">
          <details className="about-menu-details" open>
            <summary className="about-menu-summary" />
            <SubNavigation className="about-nav" />
          </details>
        </div>
        <div className="about-index__header-image">
          <img src="/about_header.png" alt="Michel Chiha Portrait" />
        </div>
        <div></div>
      </header>
      {children}
    </div>
  );
}
