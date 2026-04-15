import React from "react";
import {
  SubNavigation,
  ContentNavigation,
  ContentNavigationScript,
} from "@canopy-iiif/app/ui/server";

interface AboutLayoutProps {
  children: React.ReactNode;
  isIndex?: boolean;
}

export default function AboutLayout({ children, isIndex }: AboutLayoutProps) {
  if (isIndex) {
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
