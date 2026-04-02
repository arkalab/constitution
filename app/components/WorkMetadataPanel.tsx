interface MetadataItem {
  label: Record<string, string[]>;
  value: Record<string, string[]>;
}

function getStr(intl: Record<string, string[]> | undefined): string {
  if (!intl) return "";
  for (const vals of Object.values(intl)) {
    if (Array.isArray(vals)) {
      for (const v of vals) {
        if (v) return String(v);
      }
    }
  }
  return "";
}

function getAll(intl: Record<string, string[]> | undefined): string[] {
  if (!intl) return [];
  const keys = Object.keys(intl);
  if (!keys.length) return [];
  const vals = intl[keys[0]];
  if (!Array.isArray(vals)) return [];
  return vals.filter((v) => v != null && String(v) !== "").map(String);
}

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function findField(
  metadata: MetadataItem[],
  label: string,
): MetadataItem | undefined {
  const target = label.toLowerCase();
  return metadata.find((item) => {
    const str = getStr(item.label).toLowerCase();
    if (str !== target) return false;
    // Check that value has at least one non-empty string
    const vals = getAll(item.value);
    return vals.length > 0;
  });
}

function FacetLink({ text, facetSlug }: { text: string; facetSlug: string }) {
  const valueSlug = toSlug(text);
  if (!valueSlug) return <>{text}</>;
  const params = new URLSearchParams();
  params.set("type", "work");
  params.set(facetSlug, valueSlug);
  return (
    <a
      href={`/search?${params.toString()}`}
      data-canopy-facet-link=""
      data-facet-label={facetSlug}
      data-facet-value={valueSlug}
    >
      {text}
    </a>
  );
}

function FieldValues({
  item,
  facetSlug,
}: {
  item: MetadataItem;
  facetSlug?: string;
}) {
  const values = getAll(item.value);
  if (!facetSlug) return <>{values.join(", ")}</>;
  return (
    <>
      {values.map((v, i) => (
        <span key={i}>
          {i > 0 && ", "}
          <FacetLink text={v} facetSlug={facetSlug} />
        </span>
      ))}
    </>
  );
}

export default function WorkMetadataPanel({
  manifest,
  children,
}: {
  manifest: any;
  children?: any;
}) {
  const metadata: MetadataItem[] = manifest.metadata || [];

  // Build facet lookup
  const facetMap = new Map<string, string>();
  if (Array.isArray(manifest.__canopyMetadataFacets)) {
    for (const f of manifest.__canopyMetadataFacets) {
      if (f?.normalized && f?.slug) facetMap.set(f.normalized, f.slug);
    }
  }
  const getFacet = (label: string) => facetMap.get(label.toLowerCase());

  const title = getStr(manifest.label);
  const descriptionItem = findField(metadata, "description");
  const creatorItem = findField(metadata, "creator");
  const contributorItem = findField(metadata, "contributor");
  const languageItem = findField(metadata, "language");
  const typeItem = findField(metadata, "type");
  const dateItem = findField(metadata, "date");
  const tagsItem = findField(metadata, "tags");

  return (
    <div className="wmp">
      {title && <h1 className="wmp__title">{title}</h1>}

      {descriptionItem && (
        <p className="wmp__description">{getStr(descriptionItem.value)}</p>
      )}

      <div className="wmp__manifest">
        <span className="wmp__manifest-label">IIIF Manifest</span>
        <a href={manifest.id} className="wmp__manifest-link">
          {manifest.id}
        </a>
      </div>

      {(creatorItem || contributorItem) && (
        <div className="wmp__row wmp__row--2col">
          {creatorItem && (
            <div className="wmp__field">
              <span className="wmp__label">{getStr(creatorItem.label)}</span>
              <span className="wmp__value">
                <FieldValues
                  item={creatorItem}
                  facetSlug={getFacet("creator")}
                />
              </span>
            </div>
          )}
          {contributorItem && (
            <div className="wmp__field">
              <span className="wmp__label">
                {getStr(contributorItem.label)}
              </span>
              <span className="wmp__value">
                <FieldValues
                  item={contributorItem}
                  facetSlug={getFacet("contributor")}
                />
              </span>
            </div>
          )}
        </div>
      )}

      {(languageItem || typeItem || dateItem) && (
        <div className="wmp__row wmp__row--2col">
          {languageItem && (
            <div className="wmp__field">
              <span className="wmp__label">{getStr(languageItem.label)}</span>
              <span className="wmp__value">
                <FieldValues
                  item={languageItem}
                  facetSlug={getFacet("language")}
                />
              </span>
            </div>
          )}
          <div className="wmp__row wmp__row--2col">
            {typeItem && (
              <div className="wmp__field">
                <span className="wmp__label">{getStr(typeItem.label)}</span>
                <span className="wmp__value">
                  <FieldValues item={typeItem} facetSlug={getFacet("type")} />
                </span>
              </div>
            )}
            {dateItem && (
              <div className="wmp__field">
                <span className="wmp__label">{getStr(dateItem.label)}</span>
                <span className="wmp__value">
                  <FieldValues item={dateItem} facetSlug={getFacet("date")} />
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {(children || tagsItem) && (
        <div className="wmp__row wmp__row--2col">
          {children}
          {tagsItem && (
            <div className="wmp__field">
              <span className="wmp__label">{getStr(tagsItem.label)}</span>
              <span className="wmp__value">
                <FieldValues item={tagsItem} facetSlug={getFacet("tags")} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
