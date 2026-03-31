export default function WorkDetailScript() {
  const script = `(function () {
  var navbar = document.querySelector(".navbar-wrapper");
  if (!navbar) return;
  var threshold = 450;
  function onScroll() {
    if (window.scrollY > threshold) {
      navbar.classList.add("navbar-wrapper--scrolled");
    } else {
      navbar.classList.remove("navbar-wrapper--scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
