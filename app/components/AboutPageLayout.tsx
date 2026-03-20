import AboutNav from "./AboutNav";

interface AboutPageLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AboutPageLayout({
  children,
  currentPage = "constitution",
}: AboutPageLayoutProps) {
  return (
    <div className="about-page">
      <aside className="about-page__sidebar">
        <AboutNav currentPage={currentPage} />
      </aside>
      <main className="about-page__content">{children}</main>
    </div>
  );
}
