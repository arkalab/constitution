export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__title">
        <a href="/" className="navbar__link--logo">Michel Chiha's <i>Constitutional Papers</i></a>
      </div>
      <div className="navbar__links">
        <a href="/search" className="navbar__search-link" aria-label="Search">
          <img src="/navbar_search_icon.png" alt="Search" className="navbar__search-icon" />
        </a>
        <div className="navbar__links-list">
          <a href="/about" className="navbar__link">About</a>
          <a href="/search" className="navbar__link">Papers</a>
          <a href="/timeline" className="navbar__link">Timeline</a>
        </div>
      </div>
    </nav>
  );
}