import { useEffect } from "react";
import type { SearchI18n } from "./SearchPage.client";

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

interface FiltersModalProps {
  facets: Facet[];
  activeFilters: Record<string, string[]>;
  onToggleFilter: (
    facetSlug: string,
    valueSlug: string,
    checked: boolean,
  ) => void;
  onClose: () => void;
  isOpen: boolean;
  onClearAll: () => void;
  i18n: SearchI18n;
}

export default function FiltersModal({
  facets,
  activeFilters,
  onToggleFilter,
  onClose,
  isOpen,
  onClearAll,
  i18n,
}: FiltersModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeFilterCount = Object.values(activeFilters).flat().length;
  const hasActiveFilters = activeFilterCount > 0;
  const filterText = activeFilterCount === 0
    ? i18n.refineResults
    : i18n.filtersSelected(activeFilterCount);

  return (
    <div className="filters-modal-overlay" onClick={onClose}>
      <div className="filters-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filters-modal__header">
          <div className="filters-modal__header-top">
            <h2 className="filters-modal__title">
              Michel Chiha's <span>Constitutional Papers</span>
            </h2>
            <button
              className="filters-modal__close"
              onClick={onClose}
              aria-label="Close filters"
            >
              ×
            </button>
          </div>
          <div className="filters-modal__header-status">
            <p className="filters-modal__status-text">{filterText}</p>
            <button
              className="filters-modal__clear"
              onClick={onClearAll}
              style={{ visibility: hasActiveFilters ? 'visible' : 'hidden' }}
            >
              {i18n.clearAll}
            </button>
          </div>
        </div>

        <div className="filters-modal__facets">
          {facets.map((facet) => (
            <div key={facet.slug} className="filters-modal__facet">
              <h3 className="filters-modal__facet-title">{facet.label}</h3>
              <div className="filters-modal__values">
                {facet.values.map((value) => {
                  const isChecked =
                    activeFilters[facet.slug]?.includes(value.slug) || false;

                  return (
                    <label key={value.slug} className="filters-modal__value">
                      <input
                        type="checkbox"
                        className="filters-modal__checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          onToggleFilter(
                            facet.slug,
                            value.slug,
                            e.target.checked,
                          )
                        }
                      />
                      <span className="filters-modal__label">
                        {value.label}{" "}
                        <span className="filters-modal__count">
                          ({value.count})
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
