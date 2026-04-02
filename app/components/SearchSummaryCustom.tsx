interface SearchSummaryCustomProps {
  count: number;
  totalCount: number;
}

export default function SearchSummaryCustom({
  count,
  totalCount,
}: SearchSummaryCustomProps) {
  return (
    <div className="search-summary-custom">
      Showing {count} of {totalCount} {totalCount === 1 ? "item" : "items"}
    </div>
  );
}
