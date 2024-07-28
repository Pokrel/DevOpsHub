document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById("content");
    const topnavLinks = document.querySelectorAll(".topnav a");
    let currentSection = "home";
    
    const pages = {
        home: ["home_intro", "about", "policy", "contribute"],
        python: ["python_intro", "python_syntax", "python_comments", "python_variables"],
        css: ["css_intro", "css_syntax", "css_selectors", "css_colors"],
        javascript: ["js_intro", "js_syntax", "js_variables", "js_functions"],
        sql: ["sql_intro", "sql_syntax", "sql_select", "sql_insert"],
        numpy: ["numpy_intro", "numpy_array", "numpy_math", "numpy_random"]
    };

    function loadContent(page) {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                updateNavigationButtons(page);
                highlightCurrentTopic(page);
            })
            .catch(error => content.innerHTML = "<p>Page not found.</p>");
    }

    function updateNavigationButtons(currentPage) {
        const sectionPages = pages[currentSection] || [];
        const currentIndex = sectionPages.indexOf(currentPage);
        const prevButton = document.getElementById("prev-button");
        const nextButton = document.getElementById("next-button");

        if (currentIndex > 0) {
            prevButton.style.display = "block";
            prevButton.onclick = () => loadContent(sectionPages[currentIndex - 1]);
        } else {
            prevButton.style.display = "none";
        }

        if (currentIndex < sectionPages.length - 1) {
            nextButton.style.display = "block";
            nextButton.onclick = () => loadContent(sectionPages[currentIndex + 1]);
        } else {
            nextButton.style.display = "none";
        }
    }

    function highlightCurrentTopic(currentPage) {
        const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
        sidebarLinks.forEach(link => {
            const page = link.getAttribute("href").split("/").pop().replace(".html", "");
            if (page === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    function highlightCurrentMenu() {
        topnavLinks.forEach(link => {
            const section = link.getAttribute("href").split("/").pop().replace(".html", "");
            if (section === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    topnavLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            currentSection = this.getAttribute("href").split("/").pop().replace(".html", "");
            highlightCurrentMenu();
            const firstPage = pages[currentSection] ? pages[currentSection][0] : "home_intro";
            loadContent(firstPage);
        });
    });

    const initialPage = pages[currentSection] ? pages[currentSection][0] : "home_intro";
    loadContent(initialPage);
    highlightCurrentMenu();
});
