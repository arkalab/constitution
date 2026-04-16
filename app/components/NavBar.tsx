type Lang = "en" | "fr" | "ar";

interface NavBarProps {
  lang?: Lang;
}

const NAV_LINKS: Record<Lang, { about: { label: string; href: string }; papers: { label: string; href: string }; timeline: { label: string; href: string }; home: string; search: string; searchPlaceholder: string }> = {
  en: {
    home: "/",
    about: { label: "About", href: "/about" },
    papers: { label: "Papers", href: "/search" },
    timeline: { label: "Timeline", href: "/timeline" },
    search: "/search",
    searchPlaceholder: "Search...",
  },
  fr: {
    home: "/fr/",
    about: { label: "À propos", href: "/fr/a-propos" },
    papers: { label: "Papiers", href: "/fr/recherche" },
    timeline: { label: "Chronologie", href: "/fr/chronologie" },
    search: "/fr/recherche",
    searchPlaceholder: "Rechercher...",
  },
  ar: {
    home: "/ar/",
    about: { label: "About", href: "/ar/about" },
    papers: { label: "Papers", href: "/ar/search" },
    timeline: { label: "Timeline", href: "/ar/timeline" },
    search: "/ar/search",
    searchPlaceholder: "بحث...",
  },
};

export default function NavBar({ lang = "en" }: NavBarProps) {
  const nav = NAV_LINKS[lang];
  const script = `(function () {
  var BASE = '';
  try {
    var raw = window.CANOPY_BASE_PATH ? String(window.CANOPY_BASE_PATH).replace(/[/]+$/, '') : '';
    if (raw) BASE = raw;
  } catch (_) {}

  var enRoutes = {
    '/': { fr: '/fr/', ar: '/ar/' },
    '/about': { fr: '/fr/a-propos', ar: '/ar/about' },
    '/about/constitution': { fr: '/fr/a-propos/constitution', ar: '/ar/about/constitution' },
    '/about/document-guide': { fr: '/fr/a-propos/guide-documentaire', ar: '/ar/about/document-guide' },
    '/about/z-credits': { fr: '/fr/a-propos/z-credits', ar: '/ar/about/z-credits' },
    '/search': { fr: '/fr/recherche', ar: '/ar/search' },
    '/timeline': { fr: '/fr/chronologie', ar: '/ar/timeline' },
  };
  var frToEn = {
    '/fr/': '/',
    '/fr/a-propos': '/about',
    '/fr/a-propos/constitution': '/about/constitution',
    '/fr/a-propos/guide-documentaire': '/about/document-guide',
    '/fr/a-propos/z-credits': '/about/z-credits',
    '/fr/recherche': '/search',
    '/fr/chronologie': '/timeline',
  };
  var arToEn = {
    '/ar/': '/',
    '/ar/about': '/about',
    '/ar/about/constitution': '/about/constitution',
    '/ar/about/document-guide': '/about/document-guide',
    '/ar/about/z-credits': '/about/z-credits',
    '/ar/search': '/search',
    '/ar/timeline': '/timeline',
  };

  // Strip base path prefix so route lookups work with app-relative paths
  var fullPath = window.location.pathname;
  var path = fullPath;
  if (BASE && path.startsWith(BASE)) {
    path = path.slice(BASE.length) || '/';
  }
  var lang, enPath;

  if (path === '/fr' || path === '/fr/' || path.startsWith('/fr/')) {
    lang = 'fr';
    var frKey = (path === '/fr' || path === '/fr/') ? '/fr/' : path;
    enPath = frToEn[frKey] || '/';
  } else if (path === '/ar' || path === '/ar/' || path.startsWith('/ar/')) {
    lang = 'ar';
    var arKey = (path === '/ar' || path === '/ar/') ? '/ar/' : path;
    enPath = arToEn[arKey] || '/';
  } else {
    lang = 'en';
    enPath = path === '' ? '/' : path;
  }

  var currentEl = document.querySelector('.lang-switcher__current');
  if (currentEl) currentEl.textContent = lang.toUpperCase();

  // Update nav link hrefs if the rendered component defaulted to 'en'
  // but we're actually on a localised path (e.g. /fr/recherche uses the
  // shared search layout which always renders <NavBar /> without a lang prop)
  if (lang !== 'en') {
    var navLinkMap = {
      fr: { '/': '/fr/', '/about': '/fr/a-propos', '/search': '/fr/recherche', '/timeline': '/fr/chronologie' },
      ar: { '/': '/ar/', '/about': '/ar/about', '/search': '/ar/search', '/timeline': '/ar/timeline' },
    };
    var navLabelMap = {
      fr: { '/about': 'À propos', '/search': 'Papiers', '/timeline': 'Chronologie' },
      ar: { '/about': 'About', '/search': 'Papers', '/timeline': 'Timeline' },
    };
    var navPlaceholder = { fr: 'Rechercher...', ar: 'بحث...' };
    var map = navLinkMap[lang];
    var labelMap = navLabelMap[lang];
    if (map) {
      var allNavLinks = document.querySelectorAll('.navbar__link, .navbar__link--logo');
      allNavLinks.forEach(function(el) {
        var h = el.getAttribute('href');
        // Strip BASE prefix so we can look up the app-relative path
        var appH = h;
        if (BASE && h && h.startsWith(BASE)) appH = h.slice(BASE.length) || '/';
        if (appH && map[appH]) el.setAttribute('href', BASE + map[appH]);
        if (appH && labelMap && labelMap[appH]) el.textContent = labelMap[appH];
      });
    }
    var placeholder = navPlaceholder[lang];
    if (placeholder) {
      var searchEl = document.querySelector('.navbar__search-input');
      if (searchEl) searchEl.setAttribute('placeholder', placeholder);
    }
  } else if (BASE) {
    // For English with a base path, prepend BASE to nav links
    var allNavLinks = document.querySelectorAll('.navbar__link, .navbar__link--logo');
    allNavLinks.forEach(function(el) {
      var h = el.getAttribute('href');
      if (h && h.charAt(0) === '/' && !h.startsWith(BASE)) {
        el.setAttribute('href', BASE + h);
      }
    });
  }

  var options = document.querySelectorAll('.lang-switcher__option');
  options.forEach(function (el) {
    var optLang = el.getAttribute('data-lang');
    var href;
    if (optLang === 'en') {
      href = enPath;
    } else {
      var routes = enRoutes[enPath];
      href = (routes && routes[optLang]) ? routes[optLang] : (optLang === 'fr' ? '/fr/' : '/ar/');
    }
    el.setAttribute('href', BASE + href);
    if (optLang === lang) {
      el.parentElement.style.display = 'none';
    }
  });

  document.addEventListener('click', function (e) {
    var details = document.querySelector('.lang-switcher');
    if (details && !details.contains(e.target)) {
      details.removeAttribute('open');
    }
  });

  var navbar = document.querySelector('.navbar');
  var searchInput = document.querySelector('.navbar__search-input');
  var searchToggle = document.querySelector('.navbar__search-toggle');

  if (searchToggle && navbar && searchInput) {
    searchToggle.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('navbar--search-open');
      if (isOpen) {
        searchInput.focus();
      } else {
        searchInput.blur();
      }
    });

    document.addEventListener('click', function (e) {
      if (navbar.classList.contains('navbar--search-open') &&
          !navbar.contains(e.target)) {
        navbar.classList.remove('navbar--search-open');
      }
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navbar.classList.remove('navbar--search-open');
        hideResults();
        searchToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      var wrapper = document.querySelector('.navbar-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        hideResults();
      }
    });
  }

  // ── Search records cache ──
  var cachedRecords = null;

  function loadRecords() {
    if (cachedRecords) return Promise.resolve(cachedRecords);
    return Promise.all([
      fetch(BASE + '/api/search-index.json').then(function(r) { return r.ok ? r.json() : []; }).catch(function() { return []; }),
      fetch(BASE + '/api/search-records.json').then(function(r) { return r.ok ? r.json() : []; }).catch(function() { return []; }),
    ]).then(function(results) {
      var indexRaw = results[0];
      var displayRaw = results[1];
      var indexRecords = Array.isArray(indexRaw) ? indexRaw : (indexRaw && Array.isArray(indexRaw.records) ? indexRaw.records : []);
      var displayRecords = Array.isArray(displayRaw) ? displayRaw : (displayRaw && Array.isArray(displayRaw.records) ? displayRaw.records : []);
      var displayMap = {};
      displayRecords.forEach(function(rec) {
        if (!rec) return;
        var key = rec.id ? String(rec.id) : (rec.href ? String(rec.href) : '');
        if (key) displayMap[key] = rec;
      });
      cachedRecords = indexRecords.map(function(rec) {
        var key = rec && rec.id ? String(rec.id) : '';
        var display = key ? displayMap[key] : null;
        return Object.assign({}, display || {}, rec || {});
      });
      return cachedRecords;
    });
  }

  function filterRecords(query, records) {
    var q = query.toLowerCase().trim();
    if (!q) return [];
    var out = [];
    for (var i = 0; i < records.length; i++) {
      var rec = records[i];
      var parts = [
        String(rec && rec.title || '').toLowerCase(),
        String(rec && rec.summary || '').toLowerCase(),
      ];
      var meta = Array.isArray(rec && rec.metadata) ? rec.metadata : [];
      meta.forEach(function(m) { parts.push(String(m || '').toLowerCase()); });
      if (parts.join(' ').indexOf(q) !== -1) out.push(rec);
      if (out.length >= 8) break;
    }
    return out;
  }

  function getResultsPanel() {
    return document.querySelector('.navbar__search-results');
  }

  function hideResults() {
    var panel = getResultsPanel();
    if (panel) panel.hidden = true;
  }

  function renderResults(records) {
    var panel = getResultsPanel();
    if (!panel) return;
    if (!records.length) { panel.hidden = true; panel.innerHTML = ''; return; }
    var groups = {};
    var order = ['work', 'page'];
    records.forEach(function(rec) {
      var type = String(rec && rec.type || 'page');
      if (!groups[type]) groups[type] = [];
      groups[type].push(rec);
    });
    var html = '';
    var labels = { work: 'Documents', page: 'Pages' };
    var keys = order.filter(function(k) { return groups[k]; }).concat(
      Object.keys(groups).filter(function(k) { return order.indexOf(k) === -1; })
    );
    keys.forEach(function(type) {
      var label = labels[type] || (type.charAt(0).toUpperCase() + type.slice(1));
      html += '<div class="navbar__search-group-label">' + label + ' <span class="navbar__search-group-count">' + groups[type].length + '</span></div>';
      groups[type].forEach(function(rec) {
        var href = String(rec && rec.href || '#');
        var title = String(rec && rec.title || href);
        var fullHref = (href.charAt(0) === '/' && BASE) ? BASE + href : href;
        html += '<a class="navbar__search-result" href="' + fullHref + '">' + title + '</a>';
      });
    });
    panel.innerHTML = html;
    panel.hidden = false;
  }

  var searchInputEl = document.querySelector('.navbar__search-input');
  if (searchInputEl) {
    searchInputEl.addEventListener('input', function() {
      var q = searchInputEl.value || '';
      if (!q.trim()) { hideResults(); return; }
      loadRecords().then(function(records) {
        renderResults(filterRecords(q, records));
      });
    });
  }
})();`;

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar__title">
          <a href={nav.home} className="navbar__link--logo">Michel Chiha's <i>Constitutional Papers</i></a>
        </div>
        <div className="navbar__search-container">
          <input
            type="search"
            className="navbar__search-input"
            aria-label="Search"
            placeholder={nav.searchPlaceholder}
          />
          <div className="navbar__search-results" hidden />
        </div>
        <div className="navbar__links">
          <button type="button" className="navbar__search-toggle" aria-label="Toggle search">
            <img src="/navbar_search_icon.svg" alt="Search" className="navbar__search-icon" />
          </button>
          <div className="navbar__links-list">
            <a href={nav.about.href} className="navbar__link">{nav.about.label}</a>
            <a href={nav.papers.href} className="navbar__link">{nav.papers.label}</a>
            <a href={nav.timeline.href} className="navbar__link">{nav.timeline.label}</a>
            <details className="lang-switcher">
              <summary className="lang-switcher__summary">
                <span className="lang-switcher__current">EN</span>
                <span className="lang-switcher__arrow">▾</span>
              </summary>
              <ul className="lang-switcher__dropdown">
                <li><a href="/" className="lang-switcher__option" data-lang="en">EN</a></li>
                <li><a href="/fr/" className="lang-switcher__option" data-lang="fr">FR</a></li>
                <li><a href="/ar/" className="lang-switcher__option" data-lang="ar">AR</a></li>
              </ul>
            </details>
          </div>
        </div>
      </nav>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}