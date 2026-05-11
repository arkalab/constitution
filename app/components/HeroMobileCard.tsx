interface HeroMobileCardProps {
  children: React.ReactNode;
}

export default function HeroMobileCard({ children }: HeroMobileCardProps) {
  return (
    <div className="hero-mobile-card">
      <div className="hero-mobile-card__quote">{children}</div>
    </div>
  );
}
