async function loadHTML(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    if (id === "header") {
        const currentPage = window.location.pathname.split("/").pop();

        document.querySelectorAll(".nav a").forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }
}

loadHTML("header", "header.html");
loadHTML("footer", "footer.html");