import { useState, useEffect, useMemo } from "react";
import TabsFilter from "./TabsFilter.client";
import SearchSummaryCustom from "./SearchSummaryCustom";
import DocumentList from "./DocumentList.client";
import PageList from "./PageList";
import FiltersModal from "./FiltersModal.client";

interface SearchRecord {
  id: string;
  type: string;
  title: string;
  href: string;
  thumbnail?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  summary?: string;
  summaryMarkdown?: string;
}

interface FacetValue {
  slug: string;
  label: string;
  count: number;
}

interface Facet {
  slug: string;
  label: string;
  values: FacetValue[];
}

interface RawFacetValue {
  value: string;
  slug: string;
  doc_count: number;
  docs: number[];
}

interface RawFacet {
  label: string;
  slug: string;
  values: RawFacetValue[];
}

function parseFacetsData(
  facetsRaw: RawFacet[]
): { facets: Facet[]; facetsDocsMap: Record<string, Record<string, number[]>> } {
  const facets: Facet[] = facetsRaw.map((rawFacet) => ({
    slug: rawFacet.slug,
    label: rawFacet.label,
    values: rawFacet.values.map((v) => ({
      slug: v.slug,
      label: v.value,
      count: v.doc_count,
    })),
  }));

  // Build facetsDocsMap: { contributor: { "petro-trad": [24,26], ... } }
  const facetsDocsMap: Record<string, Record<string, number[]>> = {};
  facetsRaw.forEach((facet) => {
    facetsDocsMap[facet.slug] = {};
    facet.values.forEach((value) => {
      facetsDocsMap[facet.slug][value.slug] = value.docs;
    });
  });

  return { facets, facetsDocsMap };
}

export default function SearchPage() {
  const [records, setRecords] = useState<SearchRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"work" | "page">("work");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [facets, setFacets] = useState<Facet[]>([]);
  const [facetsDocsMap, setFacetsDocsMap] = useState<Record<string, Record<string, number[]>>>({});

  // Load data on mount
  useEffect(() => {
    Promise.all([
      fetch("/api/search-records.json").then((res) => res.json()),
      fetch("/api/search/facets.json").then((res) => res.json()),
    ])
      .then(([recordsData, facetsData]) => {
        setRecords(recordsData);
        const { facets: parsedFacets, facetsDocsMap: parsedDocsMap } =
          parseFacetsData(facetsData);
        setFacets(parsedFacets);
        setFacetsDocsMap(parsedDocsMap);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Parse URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const nextFilters: Record<string, string[]> = {};

    params.forEach((value, key) => {
      const values = value.split(",").map((v) => v.trim()).filter(Boolean);
      if (values.length > 0) {
        nextFilters[key] = values;
      }
    });

    setActiveFilters(nextFilters);
  }, []);

  const handleToggleFilter = (facetSlug: string, valueSlug: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[facetSlug] || [];
      let updated: string[];

      if (checked) {
        updated = [...current, valueSlug];
      } else {
        updated = current.filter((v) => v !== valueSlug);
      }

      const next = { ...prev };
      if (updated.length === 0) {
        delete next[facetSlug];
      } else {
        next[facetSlug] = updated;
      }

      updateURL(next);
      return next;
    });
  };

  const handleClearAll = () => {
    setActiveFilters({});
    updateURL({});
  };

  const updateURL = (filters: Record<string, string[]>) => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      }
    });

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  };

  const workRecords = records.filter((r) => r.type === "work");
  const pageRecords = records.filter((r) => r.type === "page");

  // Filter records based on active filters
  const filteredWorkRecords = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return workRecords;

    // Build map from work index to record index
    const workIndexToRecordIndex = new Map<number, number>();
    let workIndex = 0;
    records.forEach((record, recordIndex) => {
      if (record.type === "work") {
        workIndexToRecordIndex.set(workIndex, recordIndex);
        workIndex++;
      }
    });

    // Get document indices that match filters
    const facetSets: Set<number>[] = [];

    Object.entries(activeFilters).forEach(([facetSlug, valuesSlugs]) => {
      const union = new Set<number>();
      valuesSlugs.forEach((valueSlug) => {
        const workIndices = facetsDocsMap[facetSlug]?.[valueSlug] || [];
        // Convert work indices to record indices
        workIndices.forEach((workIdx) => {
          const recordIdx = workIndexToRecordIndex.get(workIdx);
          if (recordIdx !== undefined) {
            union.add(recordIdx);
          }
        });
      });
      facetSets.push(union);
    });

    // Intersect all facet sets (AND logic across facets)
    if (facetSets.length === 0) return workRecords;

    const finalIndices = facetSets.reduce((acc, set) => {
      const intersection = new Set<number>();
      acc.forEach((i) => {
        if (set.has(i)) intersection.add(i);
      });
      return intersection;
    });

    return records.filter((record, idx) => 
      record.type === "work" && finalIndices.has(idx)
    );
  }, [records, workRecords, activeFilters, facetsDocsMap]);

  const displayedRecords = activeTab === "work" ? filteredWorkRecords : pageRecords;
  const activeFilterCount = Object.values(activeFilters).flat().length;
  const totalCount = activeTab === "work" ? workRecords.length : pageRecords.length;

  if (error) {
    return (
      <div className="document-list__state">Error loading data: {error}</div>
    );
  }

  return (
    <>
      <div className="search-page__header">
        <TabsFilter
          activeTab={activeTab}
          onTabChange={setActiveTab}
          filteredWorkCount={filteredWorkRecords.length}
          filteredPageCount={pageRecords.length}
          onOpenFilters={() => setIsFiltersOpen(true)}
          activeFilterCount={activeFilterCount}
        />
        <SearchSummaryCustom count={displayedRecords.length} totalCount={totalCount} />
      </div>

      {activeTab === "work" ? (
        <DocumentList records={filteredWorkRecords} loading={loading} />
      ) : (
        <PageList records={pageRecords} />
      )}

      <FiltersModal
        facets={facets}
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        onClose={() => setIsFiltersOpen(false)}
        isOpen={isFiltersOpen}
        onClearAll={handleClearAll}
      />
    </>
  );
}
