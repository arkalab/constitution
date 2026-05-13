function SkeletonCard() {
  return (
    <div className="srch-skel-card">
      <div className="srch-skel-card__image" />
      <div className="srch-skel-card__footer">
        <div className="srch-skel-card__line" />
        <div className="srch-skel-card__line srch-skel-card__line--short" />
      </div>
    </div>
  );
}

export default function SearchSkeleton() {
  const cards = Array.from({ length: 8 });
  return (
    <div className="srch-skeleton-wrapper">
      <div className="srch-skel-inner">
        <div className="srch-skel-tabs-row">
          <div className="srch-skel-tabs">
            <div className="srch-skel-tab" />
            <div className="srch-skel-tab" />
          </div>
          <div className="srch-skel-filters" />
        </div>
        <div className="srch-skel-summary" />
        <div className="srch-skel-results">
          {cards.map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
