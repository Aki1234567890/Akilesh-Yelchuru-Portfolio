(function () {
    const validTabs = new Set(["summary", "details", "gallery", "tools"]);
    const params = new URLSearchParams(window.location.search);
    const project = params.get("project") || "lunabotics";
    const requestedTab = params.get("tab");
    const activeTab = validTabs.has(requestedTab) ? requestedTab : "summary";

    const links = Array.from(document.querySelectorAll("[data-tab-link]"));
    const views = Array.from(document.querySelectorAll("[data-tab-view]"));

    function pageUrl(tab) {
        const nextParams = new URLSearchParams(window.location.search);
        nextParams.set("project", project);
        nextParams.set("tab", tab);
        return `project.html?${nextParams.toString()}`;
    }

    function applyPage(tab) {
        views.forEach((view) => {
            view.hidden = view.dataset.tabView !== tab;
        });

        links.forEach((link) => {
            const isActive = link.dataset.tabLink === tab;
            link.classList.toggle("is-active", isActive);
            link.href = pageUrl(link.dataset.tabLink);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.assign(link.href);
        });
    });

    applyPage(activeTab);
})();
