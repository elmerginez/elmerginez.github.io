document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        loader.style.display = 'none';
    });

    var wordsWrapper = document.querySelector('.words-wrapper');
    var words = wordsWrapper.querySelectorAll('b');
    var visibleWordIndex = 0;

    setInterval(function () {
        var currentWord = words[visibleWordIndex];
        var nextWord = words[(visibleWordIndex + 1) % words.length];

        currentWord.classList.remove('is-visible');
        currentWord.classList.add('is-hidden');
        nextWord.classList.remove('is-hidden');
        nextWord.classList.add('is-visible');

        visibleWordIndex = (visibleWordIndex + 1) % words.length;
    }, 3500);

    const projectsContainer = document.getElementById("portfolio-container");

    // Cargar el JSON de proyectos
    fetch("projects.json")
        .then(response => response.json())
        .then(projectsData => {
            // Mostrar proyectos (Show projects)
            projectsData.slice(0, 3).forEach(project => {  // Limit to first 3 elements using slice
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error("Error al cargar el JSON de proyectos:", error));

    function createProjectCard(project) {
        const card = document.createElement("div");
        card.classList.add("portfolio-box");

        const image = document.createElement("img");
        image.src = project.image_url;
        card.appendChild(image);

        const info = document.createElement("div");
        info.classList.add("portfolio-layer");

        const title = document.createElement("h4");
        title.textContent = project.title;
        info.appendChild(title);

        const shortDescription = document.createElement("p");
        shortDescription.textContent = project.short_description;
        info.appendChild(shortDescription);

        const languages = document.createElement("div");
        languages.classList.add("languages");
        info.appendChild(languages)

        project.languages.forEach(language => {
            const languageItem = document.createElement("span");
            languageItem.textContent = language + " ";
            languages.appendChild(languageItem);
        });

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Detalles";
        detailsButton.classList.add("detail-btn")
        detailsButton.addEventListener("click", function () {
            showProjectDetails(project);
        });
        info.appendChild(detailsButton);

        card.appendChild(info);
        return card;
    }

    // Mostrar detalles del proyecto en un modal
    function showProjectDetails(project) {
        const modal = document.getElementById("projectModal");
        const projectDetails = document.getElementById("projectDetails");

        // Llena el modal con detalles del proyecto
        projectDetails.innerHTML = `
                <h2 class="modal-title">${project.title}</h2>
                <img class="modal-image" src="${project.image_url}" alt="${project.title}">
                <p class="modal-description">${project.detailed_description}</p>
                <p class="modal-languages">Lenguajes: ${project.languages.join(", ")}</p>
                <p class="modal-status">Estado: ${project.status}</p>
            `;

        modal.style.display = "block";

        // Cierra el modal cuando se hace clic en la X
        const closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });

        // Cierra el modal cuando se hace clic fuera del contenido
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        window.addEventListener("scroll", function (event) {
            if (event.target === modal){
                modal.style.display = "none";
            }
        });
    }
});


/*===== TOGGLE MOBILE MENU =====*/
const toggleMobileMenu = (toggleId, navId) => {
    const toggleButton = document.getElementById(toggleId);
    const mobileNav = document.getElementById(navId);

    if (toggleButton && mobileNav) {
        toggleButton.addEventListener('click', () => {
            mobileNav.classList.toggle('show');
        });
    }
};

toggleMobileMenu('nav-toggle', 'nav-menu');

/*===== ACTIVE LINK AND HIDE MOBILE MENU =====*/
const navLinks = document.querySelectorAll('.nav-link');

function activateLink() {
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    const mobileNav = document.getElementById('nav-menu');
    mobileNav.classList.remove('show');

    const checkBox = document.getElementById('checkbox');
    checkBox.checked = false;
}

navLinks.forEach(link => link.addEventListener('click', activateLink));

/*======= NAVIGATION BAR BACKGROUND =======*/
const nav = document.getElementById('nav');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        nav.style.background = 'var(--color-background)';
        nav.classList.add('shadow');
    } else {
        nav.style.background = 'none';
        nav.classList.remove('shadow');
    }
});

/*===== SCROLL REVEAL ANIMATION =====*/
const scrollReveal = ScrollReveal({
    origin: 'left',
    distance: '50px',
    duration: 1500,
    reset: true,
});

/* SCROLL HOME */
scrollReveal.reveal('.home', {});

/* SCROLL ABOUT */
scrollReveal.reveal('.about', {});

/* SCROLL PORTFOLIO */
scrollReveal.reveal('.portfolio', {});

/* SCROLL SERVICE */
scrollReveal.reveal('.services', {});

/* SCROLL CONTACT */
scrollReveal.reveal('.contact', {});
