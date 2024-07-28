document.addEventListener("DOMContentLoaded", function() {
    const pages = {
        index: ["about", "contribute", "policy"],
        devops: ["devops_intro", "continuous_integration", "continuous_delivery", "jenkins"],
        git: ["git_intro", "github"],
        linux: ["linux_intro", "redhat", "centos", "ubuntu"],
        ansible: ["ansible_intro", "adhoc_commands", "simple_project"],
        python: ["python_intro", "python_get_started", "python_syntax", "python_comments"]
        // Add more sections and pages here
    };

    const content = document.getElementById("content");
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    const currentSection = window.location.pathname.split("/").pop().replace(".html", "");

    // Function to load content
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

    // Update the navigation buttons based on the current page
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

    // Highlight the current topic in the sidebar
    function highlightCurrentTopic(currentPage) {
        sidebarLinks.forEach(link => {
            const page = link.getAttribute("href").split("/").pop().replace(".html", "");
            if (page === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Add click event listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href").split("/").pop().replace(".html", "");
            loadContent(page);
        });
    });

    // Load the initial page if any, or default to the first page of the current section
    const initialPage = pages[currentSection] ? pages[currentSection][0] : "about";
    loadContent(initialPage);
});
