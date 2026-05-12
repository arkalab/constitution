export default function MobileSearchBar() {
  return (
    <div className="mob-search-bar">
      <div className="mob-search-bar__field">
        <input
          type="search"
          className="mob-search-bar__input"
          placeholder="Search..."
          aria-label="Search"
          autoComplete="off"
          spellCheck="false"
        />
        <svg
          className="mob-search-bar__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <button
          className="mob-search-bar__clear"
          type="button"
          aria-label="Clear search"
          hidden
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function () {
  var field = document.currentScript.previousElementSibling;
  var input = field.querySelector('.mob-search-bar__input');
  var icon = field.querySelector('.mob-search-bar__icon');
  var clearBtn = field.querySelector('.mob-search-bar__clear');
  if (!input) return;

  // Locale-aware placeholder
  var lang = document.documentElement.lang || 'en';
  if (lang === 'fr') input.placeholder = 'Rechercher\u2026';
  else if (lang === 'ar') { input.placeholder = '\u0628\u062d\u062b\u2026'; input.setAttribute('dir', 'rtl'); }

  function toggleClear(show) {
    if (!icon || !clearBtn) return;
    icon.style.display = show ? 'none' : '';
    if (show) {
      clearBtn.removeAttribute('hidden');
    } else {
      clearBtn.setAttribute('hidden', '');
    }
  }

  // Pre-fill from ?q= on load
  function getQueryParam() {
    try {
      return new URLSearchParams(window.location.search).get('q') || '';
    } catch (e) { return ''; }
  }

  function dispatch(q) {
    window.dispatchEvent(new CustomEvent('canopy:search:setQuery', { detail: { query: q } }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var q = getQueryParam();
    if (q) { input.value = q; dispatch(q); toggleClear(true); }
  });

  input.addEventListener('input', function () {
    dispatch(input.value);
    toggleClear(input.value.length > 0);
  });

  input.addEventListener('search', function () {
    dispatch(input.value);
    toggleClear(input.value.length > 0);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      dispatch('');
      toggleClear(false);
      input.focus();
    });
  }
})();`,
        }}
      />
    </div>
  );
}
