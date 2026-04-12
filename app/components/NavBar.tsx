type Lang = "en" | "fr" | "ar";

interface NavBarProps {
  lang?: Lang;
}

const NAV_LINKS: Record<Lang, { about: { label: string; href: string }; papers: { label: string; href: string }; timeline: { label: string; href: string }; home: string; search: string }> = {
  en: {
    home: "/",
    about: { label: "About", href: "/about" },
    papers: { label: "Papers", href: "/search" },
    timeline: { label: "Timeline", href: "/timeline" },
    search: "/search",
  },
  fr: {
    home: "/fr/",
    about: { label: "À propos", href: "/fr/a-propos" },
    papers: { label: "Papiers", href: "/fr/recherche" },
    timeline: { label: "Chronologie", href: "/fr/chronologie" },
    search: "/fr/recherche",
  },
  ar: {
    home: "/ar/",
    about: { label: "About", href: "/ar/about" },
    papers: { label: "Papers", href: "/ar/search" },
    timeline: { label: "Timeline", href: "/ar/timeline" },
    search: "/ar/search",
  },
};

export default function NavBar({ lang = "en" }: NavBarProps) {
  const nav = NAV_LINKS[lang];
  const script = `(function () {
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

  var path = window.location.pathname;
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
    el.setAttribute('href', href);
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
})();`;

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar__title">
          <a href={nav.home} className="navbar__link--logo">Michel Chiha's <i>Constitutional Papers</i></a>
        </div>
        <div className="navbar__links">
          <a href={nav.search} className="navbar__search-link" aria-label="Search">
            <img src="/navbar_search_icon.png" alt="Search" className="navbar__search-icon" />
          </a>
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