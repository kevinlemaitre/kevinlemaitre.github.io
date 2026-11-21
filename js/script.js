document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("print-cv");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  const elements = document.querySelectorAll(".reveal");
  elements.forEach((element, index) => {
    element.style.setProperty("--delay", `${index * 60}ms`);
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsViewTimeline =
    window.CSS &&
    window.CSS.supports("animation-timeline: view()") &&
    window.CSS.supports("animation-range: entry 0% entry 100%");

  if (prefersReducedMotion) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  if (supportsViewTimeline) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(element => observer.observe(element));
});
