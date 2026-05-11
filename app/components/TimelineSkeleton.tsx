/**
 * TimelineSkeleton
 *
 * Server-side-rendered placeholder shown before the deferred
 * canopy-timeline.js script executes and paints the real timeline.
 * Uses the exact same CSS grid / class structure as the real timeline so
 * the spine, corners and layout are pixel-identical.
 *
 * Fades out automatically via the CSS rule:
 *   div:has([data-canopy-timeline-mounted="1"]) .ct-skeleton-wrapper { opacity: 0 }
 */

function LeftCard({
  titleWidth = "88%",
  hasSecondTitle = false,
  secondTitleWidth = "62%",
  manifestCount = 0,
}: {
  titleWidth?: string;
  hasSecondTitle?: boolean;
  secondTitleWidth?: string;
  manifestCount?: number;
}) {
  return (
    <div className="ct-row">
      <div className="ct-cell ct-cell--left">
        <div className="ct-card">
          <div className="ct-corner ct-corner--left">
            <div className="ct-corner__v" />
            <div className="ct-corner__h" />
          </div>
          <div className="ct-skel-date" />
          <div className="ct-skel-title" style={{width: titleWidth}} />
          {hasSecondTitle && (
            <div className="ct-skel-title" style={{width: secondTitleWidth}} />
          )}
          {manifestCount > 0 && (
            <div className="ct-skel-manifests">
              {Array.from({length: Math.min(manifestCount, 1)}).map((_, i) => (
                <div key={i} className="ct-skel-manifest-card" />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="ct-dot-col" />
      <div className="ct-cell ct-cell--right ct-cell--empty" />
    </div>
  );
}

function RightCard({
  titleWidth = "80%",
  hasSecondTitle = false,
  secondTitleWidth = "55%",
  manifestCount = 0,
}: {
  titleWidth?: string;
  hasSecondTitle?: boolean;
  secondTitleWidth?: string;
  manifestCount?: number;
}) {
  return (
    <div className="ct-row">
      <div className="ct-cell ct-cell--left ct-cell--empty" />
      <div className="ct-dot-col" />
      <div className="ct-cell ct-cell--right">
        <div className="ct-card">
          <div className="ct-corner ct-corner--right">
            <div className="ct-corner__h" />
            <div className="ct-corner__v" />
          </div>
          <div className="ct-skel-date" />
          <div className="ct-skel-title" style={{width: titleWidth}} />
          {hasSecondTitle && (
            <div className="ct-skel-title" style={{width: secondTitleWidth}} />
          )}
          {manifestCount > 0 && (
            <div className="ct-skel-manifests">
              {Array.from({length: Math.min(manifestCount, 1)}).map((_, i) => (
                <div key={i} className="ct-skel-manifest-card" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimelineSkeleton() {
  return (
    <div className="ct-skeleton-wrapper">
      <div className="ct-timeline">
        <div className="ct-rows">
          {/* Intro row */}
          <div className="ct-row">
            <div className="ct-cell ct-cell--left">
              <div className="ct-card ct-card--intro">
                <div className="ct-skel-intro-title" />
                <div className="ct-skel-date" style={{width: "52%"}} />
              </div>
            </div>
            <div className="ct-dot-col" />
            <div className="ct-cell ct-cell--right">
              <div className="ct-year">
                <div className="ct-skel-year" />
              </div>
            </div>
          </div>

          <LeftCard titleWidth="90%" manifestCount={2} />
          <RightCard titleWidth="78%" />
          <LeftCard
            titleWidth="85%"
            hasSecondTitle
            secondTitleWidth="70%"
            manifestCount={1}
          />
          <RightCard titleWidth="72%" hasSecondTitle secondTitleWidth="58%" />
          <LeftCard titleWidth="88%" manifestCount={2} />
          <RightCard titleWidth="65%" manifestCount={1} />
          <LeftCard
            titleWidth="80%"
            hasSecondTitle
            secondTitleWidth="60%"
          />
        </div>
      </div>
    </div>
  );
}
