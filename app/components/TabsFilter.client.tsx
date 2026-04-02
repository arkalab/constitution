interface TabsFilterProps {
  activeTab: "work" | "page";
  onTabChange: (tab: "work" | "page") => void;
  filteredWorkCount: number;
  filteredPageCount: number;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

export default function TabsFilter({
  activeTab,
  onTabChange,
  filteredWorkCount,
  filteredPageCount,
  onOpenFilters,
  activeFilterCount,
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
          Papers ({filteredWorkCount})
        </button>
        <button
          className={`tabs-filter__button ${
            activeTab === "page" ? "tabs-filter__button--active" : ""
          }`}
          onClick={() => onTabChange("page")}
        >
          Pages ({filteredPageCount})
        </button>
      </div>
      <button
        className="tabs-filter__filters-button"
        onClick={onOpenFilters}
      >
        Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
      </button>
    </div>
  );
}
