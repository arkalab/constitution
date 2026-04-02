import { useState } from "react";

interface SearchRecord {
  id: string;
  type: string;
  title: string;
  href: string;
  thumbnail?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}

interface DocumentListProps {
  records: SearchRecord[];
  loading: boolean;
}

function DocumentCard({ record }: { record: SearchRecord }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <a
      key={record.id}
      href={record.href}
      className="document-list__item"
    >
      <div
        className={`document-list__media ${
          !imageLoaded ? "document-list__media--loading" : ""
        }`}
      >
        {record.thumbnail && (
          <img
            src={record.thumbnail}
            alt={record.title}
            width={record.thumbnailWidth}
            height={record.thumbnailHeight}
            className={`document-list__thumbnail ${
              imageLoaded
                ? "document-list__thumbnail--loaded"
                : "document-list__thumbnail--loading"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
      <p className="document-list__title">{record.title}</p>
    </a>
  );
}

export default function DocumentList({ records, loading }: DocumentListProps) {
  if (loading) return <div className="document-list__state">Loading…</div>;

  if (records.length === 0) {
    return <div className="document-list__state">No documents found.</div>;
  }

  return (
    <section className="document-list">
      <div className="document-list__track">
        {records.map((record) => (
          <DocumentCard key={record.id} record={record} />
        ))}
      </div>
    </section>
  );
}
