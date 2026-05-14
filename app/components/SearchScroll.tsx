export default function SearchScroll() {
  const script = `(function () {
  var FACTOR = 3.5;
  function attach(el) {
    if (!el || el.dataset.wheelBoost === "1") return;
    el.dataset.wheelBoost = "1";
    el.addEventListener("wheel", function (e) {
      if (el.querySelector(".search-result.page")) return;
      if (el.scrollWidth <= el.clientWidth) return;
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      el.scrollLeft -= delta * FACTOR;
    }, { passive: false });
  }
  function scan() {
    document.querySelectorAll("#search-results").forEach(attach);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan, { once: true });
  } else {
    scan();
  }
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
