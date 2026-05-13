type Lang = "en" | "fr" | "ar";

interface FooterSectionProps {
  lang?: Lang;
}

const NAV_LINKS: Record<
  Lang,
  {
    about: { label: string; href: string };
    constitution: { label: string; href: string };
    documentGuide: { label: string; href: string };
    credits: { label: string; href: string };
    papers: { label: string; href: string };
    timeline: { label: string; href: string };
  }
> = {
  en: {
    about: { label: "About", href: "/about" },
    constitution: { label: "Constitution", href: "/about/constitution" },
    documentGuide: { label: "Document Guide", href: "/about/document-guide" },
    credits: { label: "Credits", href: "/about/z-credits" },
    papers: { label: "Papers", href: "/search" },
    timeline: { label: "Timeline", href: "/timeline" },
  },
  fr: {
    about: { label: "À propos", href: "/fr/a-propos" },
    constitution: { label: "Constitution", href: "/fr/a-propos/constitution" },
    documentGuide: { label: "Guide documentaire", href: "/fr/a-propos/guide-documentaire" },
    credits: { label: "Crédits", href: "/fr/a-propos/z-credits" },
    papers: { label: "Papiers", href: "/fr/recherche" },
    timeline: { label: "Chronologie", href: "/fr/chronologie" },
  },
  ar: {
    about: { label: "About", href: "/ar/about" },
    constitution: { label: "Constitution", href: "/ar/about/constitution" },
    documentGuide: { label: "Document Guide", href: "/ar/about/document-guide" },
    credits: { label: "Credits", href: "/ar/about/z-credits" },
    papers: { label: "Papers", href: "/ar/search" },
    timeline: { label: "Timeline", href: "/ar/timeline" },
  },
};

export default function FooterSection({ lang = "en" }: FooterSectionProps) {
  const nav = NAV_LINKS[lang];

  const script = `(function () {
  var BASE = '';
  try {
    var raw = window.CANOPY_BASE_PATH ? String(window.CANOPY_BASE_PATH).replace(/[/]+$/, '') : '';
    if (raw) BASE = raw;
  } catch (_) {}

  var enRoutes = {
    '/about': { fr: '/fr/a-propos', ar: '/ar/about' },
    '/about/constitution': { fr: '/fr/a-propos/constitution', ar: '/ar/about/constitution' },
    '/about/document-guide': { fr: '/fr/a-propos/guide-documentaire', ar: '/ar/about/document-guide' },
    '/about/z-credits': { fr: '/fr/a-propos/z-credits', ar: '/ar/about/z-credits' },
    '/search': { fr: '/fr/recherche', ar: '/ar/search' },
    '/timeline': { fr: '/fr/chronologie', ar: '/ar/timeline' },
  };
  var frToEn = {
    '/fr/a-propos': '/about',
    '/fr/a-propos/constitution': '/about/constitution',
    '/fr/a-propos/guide-documentaire': '/about/document-guide',
    '/fr/a-propos/z-credits': '/about/z-credits',
    '/fr/recherche': '/search',
    '/fr/chronologie': '/timeline',
  };
  var arToEn = {
    '/ar/about': '/about',
    '/ar/about/constitution': '/about/constitution',
    '/ar/about/document-guide': '/about/document-guide',
    '/ar/about/z-credits': '/about/z-credits',
    '/ar/search': '/search',
    '/ar/timeline': '/timeline',
  };
  var frLabels = {
    '/about': 'À propos',
    '/about/constitution': 'Constitution',
    '/about/document-guide': 'Guide documentaire',
    '/about/z-credits': 'Crédits',
    '/search': 'Papiers',
    '/timeline': 'Chronologie',
  };

  var fullPath = window.location.pathname;
  var path = fullPath;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || '/';

  var lang, enPath;
  if (path === '/fr' || path === '/fr/' || path.startsWith('/fr/')) {
    lang = 'fr';
    enPath = frToEn[path] || '/';
  } else if (path === '/ar' || path === '/ar/' || path.startsWith('/ar/')) {
    lang = 'ar';
    enPath = arToEn[path] || '/';
  } else {
    lang = 'en';
    enPath = path === '' ? '/' : path;
  }

  if (lang !== 'en') {
    var navLinkMap = {
      fr: { '/about': '/fr/a-propos', '/about/constitution': '/fr/a-propos/constitution', '/about/document-guide': '/fr/a-propos/guide-documentaire', '/about/z-credits': '/fr/a-propos/z-credits', '/search': '/fr/recherche', '/timeline': '/fr/chronologie' },
      ar: { '/about': '/ar/about', '/about/constitution': '/ar/about/constitution', '/about/document-guide': '/ar/about/document-guide', '/about/z-credits': '/ar/about/z-credits', '/search': '/ar/search', '/timeline': '/ar/timeline' },
    };
    var labelMap = lang === 'fr' ? frLabels : {};
    var map = navLinkMap[lang];
    if (map) {
      var footerLinks = document.querySelectorAll('.footer__nav-link');
      footerLinks.forEach(function (el) {
        var h = el.getAttribute('href');
        var appH = (BASE && h && h.startsWith(BASE)) ? h.slice(BASE.length) || '/' : h;
        if (appH && map[appH]) el.setAttribute('href', BASE + map[appH]);
        if (appH && labelMap && labelMap[appH]) el.textContent = labelMap[appH];
      });
    }
  } else if (BASE) {
    var footerLinks = document.querySelectorAll('.footer__nav-link');
    footerLinks.forEach(function (el) {
      var h = el.getAttribute('href');
      if (h && h.charAt(0) === '/' && !h.startsWith(BASE)) {
        el.setAttribute('href', BASE + h);
      }
    });
  }

  // Language switcher hrefs
  var langLinks = document.querySelectorAll('.footer__language-link');
  langLinks.forEach(function (el) {
    var optLang = el.getAttribute('data-lang');
    var href;
    if (optLang === 'en') {
      href = enPath && enPath !== '/' ? enPath : '/';
    } else {
      var routes = enRoutes[enPath];
      href = (routes && routes[optLang]) ? routes[optLang] : (optLang === 'fr' ? '/fr/' : '/ar/');
    }
    el.setAttribute('href', BASE + href);
  });
})();`;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <ul className="footer__list">
          <li className="footer__item"><a href={nav.about.href} className="footer__nav-link">{nav.about.label}</a></li>
          <li className="footer__item"><a href={nav.constitution.href} className="footer__nav-link">{nav.constitution.label}</a></li>
          <li className="footer__item"><a href={nav.documentGuide.href} className="footer__nav-link">{nav.documentGuide.label}</a></li>
          <li className="footer__item"><a href={nav.credits.href} className="footer__nav-link">{nav.credits.label}</a></li>
        </ul>
        <ul className="footer__list">
          <li className="footer__item"><a href={nav.papers.href} className="footer__nav-link">{nav.papers.label}</a></li>
          <li className="footer__item"><a href={nav.timeline.href} className="footer__nav-link">{nav.timeline.label}</a></li>
        </ul>
        <ul className="footer__language">
          <li className="footer__language-item"><a href="/" className="footer__language-link" data-lang="en">EN</a></li>
          <li className="footer__language-item"><a href="/fr/" className="footer__language-link" data-lang="fr">FR</a></li>
          <li className="footer__language-item"><a href="/ar/" className="footer__language-link" data-lang="ar">AR</a></li>
        </ul>
        <img
          src="/footer_signature.png"
          alt="Michel Chiha's Constitutional Papers"
          className="footer__logo"
        />
        <div className="footer__copyright">
          <p className="footer__copyright-line">© 2026 Michel Chiha Foundation, MIT License.</p>
          <p className="footer__copyright-line">Made by <a href="https://arka.la">Arka</a> with Canopy IIIF.</p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </footer>
  );
}
