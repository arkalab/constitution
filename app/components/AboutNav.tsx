export default function AboutNav({ currentPage }: { currentPage?: string }) {
  const pages = [
    { title: "About", href: "/about/", slug: "index" },
    { title: "Constitution", href: "/about/constitution", slug: "constitution" },
    { title: "Papers", href: "/about/document-guide", slug: "document-guide" },
    { title: "Credits", href: "/about/z-credits", slug: "z-credits" },
  ];

  return (
    <nav className="about-nav">
      <ul className="about-nav__list">
        {pages.map((page) => (
          <li key={page.slug} className="about-nav__item">
            <a
              href={page.href}
              className={`about-nav__link ${
                currentPage === page.slug ? "about-nav__link--active" : ""
              }`}
            >
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
