import AboutNav from "./AboutNav";

interface AboutLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AboutLayout({
  children,
  currentPage = "index",
}: AboutLayoutProps) {
  return (
    <div className="about-index">
      <header className="about-index__header">
        <div className="about-index__header-nav">
          <AboutNav currentPage={currentPage} />
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
