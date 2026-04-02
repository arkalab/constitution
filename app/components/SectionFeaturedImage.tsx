interface SectionFeaturedImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function SectionFeaturedImage({
  src,
  alt,
  caption,
}: SectionFeaturedImageProps) {
  return (
    <>
      <div className="about-index__content-12 about-index__content--center">
        <div className="about-index__image-wrapper">
          <img src={src} alt={alt} className="about-index__image" />
        </div>
      </div>
      {caption && (
        <div className="about-index__content-12 about-index__content--center">
          <p className="about-index__image-caption">{caption}</p>
        </div>
      )}
    </>
  );
}
