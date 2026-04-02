interface SectionSubtitleProps {
  children: React.ReactNode;
}

export default function SectionSubtitle({ children }: SectionSubtitleProps) {
  return (
    <div className="about-index__content-10 about-index__content--center">
      <h2 className="about-index__subtitle">{children}</h2>
    </div>
  );
}
