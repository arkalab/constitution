import type { SearchI18n } from "./SearchPage.client";

interface SearchSummaryCustomProps {
  count: number;
  totalCount: number;
  i18n: SearchI18n;
}

export default function SearchSummaryCustom({
  count,
  totalCount,
  i18n,
}: SearchSummaryCustomProps) {
  return (
    <div className="search-summary-custom">
      {i18n.showing} {count} {i18n.of} {totalCount} {totalCount === 1 ? i18n.item : i18n.items}
    </div>
  );
}
