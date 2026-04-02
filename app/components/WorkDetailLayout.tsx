import type { ReactNode } from "react";

interface WorkDetailLayoutProps {
  children: ReactNode;
  heroImage: string;
}

export default function WorkDetailLayout({
  children,
  heroImage,
}: WorkDetailLayoutProps) {
  return (
    <>
      <div className="work-detail__hero">
        {heroImage && (
          <img
            src={heroImage}
            className="work-detail__hero-image"
            alt=""
          />
        )}
      </div>
      <div className="work-detail__content">{children}</div>
    </>
  );
}
