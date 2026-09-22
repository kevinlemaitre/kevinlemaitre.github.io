document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");
  elements.forEach((element, index) => {
    element.style.setProperty("--delay", `${index * 60}ms`);
  });

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
