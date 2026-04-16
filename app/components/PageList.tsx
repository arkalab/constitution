import { withBasePath } from "@canopy-iiif/app/base-path";
import type { SearchI18n } from "./SearchPage.client";

interface PageRecord {
  id: string;
  title: string;
  href: string;
  summary?: string;
  summaryMarkdown?: string;
}

interface PageListProps {
  records: PageRecord[];
  i18n: SearchI18n;
}

function truncateText(text: string, maxLength: number = 380): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export default function PageList({ records, i18n }: PageListProps) {
  if (records.length === 0) {
    return (
      <div className="page-list">
        <p className="document-list__state">{i18n.noPages}</p>
      </div>
    );
  }

  return (
    <div className="page-list">
      <div className="page-list__items">
        {records.map((record) => {
          const summaryText = record.summaryMarkdown || record.summary || "";
          const truncated = truncateText(summaryText, 380);

          return (
            <a key={record.id} href={withBasePath(record.href)} className="page-list__item">
              <h3 className="page-list__title">{record.title}</h3>
              <span className="page-list__href">{record.href}</span>
              {truncated && <p className="page-list__summary">{truncated}</p>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
