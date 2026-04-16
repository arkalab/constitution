import { useState, useEffect, useMemo } from "react";
import { readBasePath } from "@canopy-iiif/app/base-path";
import TabsFilter from "./TabsFilter.client";
import SearchSummaryCustom from "./SearchSummaryCustom";
import DocumentList from "./DocumentList.client";
import PageList from "./PageList";
import FiltersModal from "./FiltersModal.client";

type SearchLang = "en" | "fr" | "ar";

export interface SearchI18n {
  tabPapers: string;
  tabPages: string;
  filters: string;
  showing: string;
  of: string;
  item: string;
  items: string;
  loading: string;
  noDocuments: string;
  noPages: string;
  refineResults: string;
  filtersSelected: (n: number) => string;
  clearAll: string;
}

const SEARCH_I18N: Record<SearchLang, SearchI18n> = {
  en: {
    tabPapers: "Papers",
    tabPages: "Pages",
    filters: "Filters",
    showing: "Showing",
    of: "of",
    item: "item",
    items: "items",
    loading: "Loading…",
    noDocuments: "No documents found.",
    noPages: "No pages found.",
    refineResults: "Refine results by metadata",
    filtersSelected: (n) => `${n} filter${n > 1 ? "s" : ""} selected`,
    clearAll: "Clear All",
  },
  fr: {
    tabPapers: "Papiers",
    tabPages: "Pages",
    filters: "Filtres",
    showing: "Affichage de",
    of: "sur",
    item: "\u00e9l\u00e9ment",
    items: "\u00e9l\u00e9ments",
    loading: "Chargement…",
    noDocuments: "Aucun document trouv\u00e9.",
    noPages: "Aucune page trouv\u00e9e.",
    refineResults: "Affiner les r\u00e9sultats par m\u00e9tadonn\u00e9es",
    filtersSelected: (n) => `${n} filtre${n > 1 ? "s" : ""} s\u00e9lectionn\u00e9${n > 1 ? "s" : ""}`,
    clearAll: "Tout effacer",
  },
  ar: {
    tabPapers: "Papers",
    tabPages: "Pages",
    filters: "Filters",
    showing: "Showing",
    of: "of",
    item: "item",
    items: "items",
    loading: "Loading…",
    noDocuments: "No documents found.",
    noPages: "No pages found.",
    refineResults: "Refine results by metadata",
    filtersSelected: (n) => `${n} filter${n > 1 ? "s" : ""} selected`,
    clearAll: "Clear All",
  },
};

function getSearchLang(): SearchLang {
  if (typeof window === "undefined") return "en";
  const code = (window as unknown as Record<string, unknown>).CANOPY_LOCALE_CODE;
  if (code === "fr" || code === "ar") return code;
  return "en";
}

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
  const i18n = SEARCH_I18N[getSearchLang()];
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
    const base = readBasePath();
    Promise.all([
      fetch(`${base}/api/search-records.json`).then((res) => res.json()),
      fetch(`${base}/api/search/facets.json`).then((res) => res.json()),
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
          i18n={i18n}
        />
        <SearchSummaryCustom count={displayedRecords.length} totalCount={totalCount} i18n={i18n} />
      </div>

      {activeTab === "work" ? (
        <DocumentList records={filteredWorkRecords} loading={loading} i18n={i18n} />
      ) : (
        <PageList records={pageRecords} i18n={i18n} />
      )}

      <FiltersModal
        facets={facets}
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        onClose={() => setIsFiltersOpen(false)}
        isOpen={isFiltersOpen}
        onClearAll={handleClearAll}
        i18n={i18n}
      />
    </>
  );
}
