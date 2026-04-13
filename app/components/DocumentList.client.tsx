import { useState } from "react";
import type { SearchI18n } from "./SearchPage.client";

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
  i18n: SearchI18n;
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

export default function DocumentList({ records, loading, i18n }: DocumentListProps) {
  if (loading) return <div className="document-list__state">{i18n.loading}</div>;

  if (records.length === 0) {
    return <div className="document-list__state">{i18n.noDocuments}</div>;
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
