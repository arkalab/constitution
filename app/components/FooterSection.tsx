export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <ul className="footer__list">
          <li className="footer__item">Background</li>
          <li className="footer__item">Statehood</li>
          <li className="footer__item">The Poet</li>
          <li className="footer__item">Finance & Economy</li>
          <li className="footer__item">Newspaper Editor</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__item">Political Career</li>
          <li className="footer__item">International Relations</li>
          <li className="footer__item">Editorials</li>
          <li className="footer__item">Michel Chiha Foundation</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__item">Books</li>
          <li className="footer__item">Timeline</li>
          <li className="footer__item">Events & Lectures</li>
          <li className="footer__item">Contact</li>
        </ul>
        <ul className="footer__language">
          <li className="footer__language-item">EN</li>
          <li className="footer__language-item">FR</li>
          <li className="footer__language-item">AR</li>
        </ul>
        <img
          src="/footer_signature.png"
          alt="Michel Chiha's Constitutional Papers"
          className="footer__logo"
        />
      </div>
    </footer>
  );
}
