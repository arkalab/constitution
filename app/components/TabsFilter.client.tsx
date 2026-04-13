import type { SearchI18n } from "./SearchPage.client";

interface TabsFilterProps {
  activeTab: "work" | "page";
  onTabChange: (tab: "work" | "page") => void;
  filteredWorkCount: number;
  filteredPageCount: number;
  onOpenFilters: () => void;
  activeFilterCount: number;
  i18n: SearchI18n;
}

export default function TabsFilter({
  activeTab,
  onTabChange,
  filteredWorkCount,
  filteredPageCount,
  onOpenFilters,
  activeFilterCount,
  i18n,
}: TabsFilterProps) {
  return (
    <div className="tabs-filter">
      <div className="tabs-filter__tabs">
        <button
          className={`tabs-filter__button ${
            activeTab === "work" ? "tabs-filter__button--active" : ""
          }`}
          onClick={() => onTabChange("work")}
        >
          {i18n.tabPapers} ({filteredWorkCount})
        </button>
        <button
          className={`tabs-filter__button ${
            activeTab === "page" ? "tabs-filter__button--active" : ""
          }`}
          onClick={() => onTabChange("page")}
        >
          {i18n.tabPages} ({filteredPageCount})
        </button>
      </div>
      <button
        className="tabs-filter__filters-button"
        onClick={onOpenFilters}
      >
        {i18n.filters}{activeFilterCount > 0 && ` (${activeFilterCount})`}
      </button>
    </div>
  );
}
