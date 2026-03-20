interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="about-index__content-12 about-index__content--center">
      <h1 className="about-index__title">{children}</h1>
    </div>
  );
}
