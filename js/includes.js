async function loadInclude(id, file) {
  const target = document.getElementById(id);
  if (!target) return;
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(`Impossible de charger ${file}:`, error);
  }
}

async function initIncludes() {
  await Promise.all([
    loadInclude("header", "header.html"),
    loadInclude("footer", "footer.html")
  ]);

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-page]").forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const menu = document.querySelector(".mobile-nav-wrap");
  if (menu) {
    menu.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => menu.removeAttribute("open"))
    );
  }
}
document.addEventListener("DOMContentLoaded", initIncludes);
