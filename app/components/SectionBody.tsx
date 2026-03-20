interface SectionBodyProps {
  children: React.ReactNode;
  align?: "left" | "center";
  span?: 12 | 10;
}

export default function SectionBody({
  children,
  align = "left",
  span = 12,
}: SectionBodyProps) {
  const spanClass =
    span === 12 ? "about-index__content-12" : "about-index__content-10";
  const alignClass =
    align === "center"
      ? "about-index__content--center"
      : "about-index__content--left";

  return (
    <div className={`${spanClass} ${alignClass} about-index__body`}>
      {children}
    </div>
  );
}
