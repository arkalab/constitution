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
    '/about/index.html': { fr: '/fr/a-propos/index.html', ar: '/ar/about/index.html' },
    '/about/document-guide.html': { fr: '/fr/a-propos/guide-documentaire.html', ar: '/ar/about/document-guide.html' },
    '/about/z-credits.html': { fr: '/fr/a-propos/z-credits.html', ar: '/ar/about/z-credits.html' },
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

  // Horizontal scroll with vertical wheel on search results
  if (document.body.classList.contains('canopy-type-search')) {
    var observer = new MutationObserver(function() {
      var results = document.querySelector('#search-results');
      if (results && !results.__hscroll) {
        results.__hscroll = true;
        results.addEventListener('wheel', function(e) {
          if (results.scrollWidth <= results.clientWidth) return;
          e.preventDefault();
          results.scrollBy({ left: -e.deltaY, behavior: 'smooth' });
        }, { passive: false });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ── Mobile hamburger ──
  var hamburger = document.querySelector('.navbar__hamburger');
  var mobMenu = document.querySelector('.mob-menu');
  var mobClose = document.querySelector('.mob-menu__close');
  var mobOverlay = document.querySelector('.mob-menu-overlay');

  function openMobMenu() {
    if (mobMenu) mobMenu.classList.add('mob-menu--open');
    if (mobOverlay) mobOverlay.classList.add('mob-menu-overlay--open');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMobMenu() {
    if (mobMenu) mobMenu.classList.remove('mob-menu--open');
    if (mobOverlay) mobOverlay.classList.remove('mob-menu-overlay--open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMobMenu);
  if (mobClose) mobClose.addEventListener('click', closeMobMenu);
  if (mobOverlay) mobOverlay.addEventListener('click', closeMobMenu);

  // Close menu when a nav link is clicked; prevent navigation if already on that page
  var mobNavLinks = document.querySelectorAll('.mob-menu__link, .mob-menu__sublink');
  mobNavLinks.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var h = el.getAttribute('href') || '';
      var currentPath = window.location.pathname;
      var norm = function(p) { return (p.length > 1 && p[p.length - 1] === '/') ? p.slice(0, -1) : p; };
      if (norm(currentPath) === norm(h)) {
        e.preventDefault();
      }
      closeMobMenu();
    });
  });

  // Correct mob-menu hrefs and labels for locale + BASE
  var mobLabelMap = {
    fr: {
      '/about': 'À propos',
      '/about/index.html': 'À propos',
      '/search': 'Papiers',
      '/timeline': 'Chronologie',
      '/about/constitution': 'Constitution',
      '/about/document-guide': 'Guide documentaire',
      '/about/document-guide.html': 'Papiers',
      '/about/z-credits': 'Crédits',
      '/about/z-credits.html': 'Crédits',
    },
    ar: {
      '/about': 'About',
      '/about/index.html': 'About',
      '/search': 'Papers',
      '/timeline': 'Timeline',
      '/about/constitution': 'Constitution',
      '/about/document-guide': 'Document Guide',
      '/about/document-guide.html': 'Papers',
      '/about/z-credits': 'Credits',
      '/about/z-credits.html': 'Credits',
    },
  };
  var mobNavEls = document.querySelectorAll('.mob-menu__link, .mob-menu__sublink, .mob-menu__title');
  var mobLabels = (lang !== 'en' && mobLabelMap[lang]) ? mobLabelMap[lang] : null;
  mobNavEls.forEach(function(el) {
    var h = el.getAttribute('href');
    if (!h) return;
    var appH = (BASE && h.startsWith(BASE)) ? h.slice(BASE.length) || '/' : h;
    if (lang !== 'en') {
      if (mobLabels && mobLabels[appH] && !el.classList.contains('mob-menu__title')) {
        el.textContent = mobLabels[appH];
      }
      var routes = enRoutes[appH];
      if (routes && routes[lang]) {
        el.setAttribute('href', BASE + routes[lang]);
        return;
      }
    }
    if (BASE && appH.charAt(0) === '/' && !h.startsWith(BASE)) {
      el.setAttribute('href', BASE + appH);
    }
  });

  // Show navbar gradient only after scrolling (skip work pages — WorkDetailScript handles those)
  if (!document.body.classList.contains('canopy-type-work')) {
    var navbarWrapper = document.querySelector('.navbar-wrapper');
    if (navbarWrapper) {
      var updateGradient = function() {
        if (window.scrollY > 0) {
          navbarWrapper.classList.add('navbar-wrapper--scrolled');
        } else {
          navbarWrapper.classList.remove('navbar-wrapper--scrolled');
        }
      };
      window.addEventListener('scroll', updateGradient, { passive: true });
      updateGradient();
    }
  }
})();`;

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar__title">
          <a href={nav.home} className="navbar__link--logo">Michel Chiha's <span className="navbar__logo-line2"><i>Constitutional Papers</i></span></a>
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
          <button type="button" className="navbar__hamburger" aria-label="Open menu" aria-expanded="false">
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
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
      <div className="mob-menu-overlay" />
      <div className="mob-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="mob-menu__header">
          <a href={nav.home} className="mob-menu__title">Michel Chiha's<br /><i>Constitutional Papers</i></a>
          <button type="button" className="mob-menu__close" aria-label="Close menu">✕</button>
        </div>
        <div className="mob-menu__body">
          <nav className="mob-menu__nav">
            <a href={nav.home} className="mob-menu__link mob-menu__link--home">Home</a>
            <div className="mob-menu__item">
              <a href="/about/index.html" className="mob-menu__link">{nav.about.label}</a>
              <ul className="mob-menu__subnav">
                <li><a href="/about/document-guide.html" className="mob-menu__sublink">Papers</a></li>
                <li><a href="/about/z-credits.html" className="mob-menu__sublink">Credits</a></li>
              </ul>
            </div>
            <a href={nav.papers.href} className="mob-menu__link">{nav.papers.label}</a>
            <a href={nav.timeline.href} className="mob-menu__link">{nav.timeline.label}</a>
          </nav>
          <div className="mob-menu__lang">
            <ul className="mob-menu__lang-list">
              <li><a href="/" className="lang-switcher__option mob-menu__lang-link" data-lang="en">EN</a></li>
              <li><a href="/fr/" className="lang-switcher__option mob-menu__lang-link" data-lang="fr">FR</a></li>
              <li><a href="/ar/" className="lang-switcher__option mob-menu__lang-link" data-lang="ar">AR</a></li>
            </ul>
          </div>
        </div>
        <div className="mob-menu__footer">
          <img src="/footer_signature.png" className="mob-menu__signature" alt="" />
          <p className="mob-menu__copyright">© 2026 Michel Chiha Foundation, MIT License.</p>
          <p className="mob-menu__copyright">Made by <a href="https://arka.la">Arka</a> with Canopy IIIF.</p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}