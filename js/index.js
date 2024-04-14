document.addEventListener("DOMContentLoaded", function () {

    var loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        loader.style.display = 'none';
    });
    
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    // Verificar si ya hay un tema guardado en la cookie
    const savedTheme = getCookie('preferredTheme');

    // Si hay un tema guardado, cargar ese tema por defecto
    if (savedTheme) {
        changeTheme(savedTheme);
    }

    // Verificar si ya hay un idioma guardado en la cookie
    const savedLanguage = getCookie('preferredLanguage');

    // Si hay un idioma guardado, cargar ese idioma por defecto
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }

    function changeTheme(theme) {

        // Guardar el tema seleccionado en una cookie
        setCookie('preferredTheme', theme, 30); // 30 días de expiración
    }

    function changeLanguage(language) {
        // Actualizar el idioma del documento
        fetch(`lang/projects${language}.json`)
            .then(response => response.json())
            .then(projectsData => {
                // Mostrar proyectos
                projectsData.forEach(project => {
                    const projectCard = createProjectCard(project);
                    projectsContainer.appendChild(projectCard);
                });
            })
            .catch(error => console.error("Error al cargar el JSON de proyectos:", error));

        fetch(`lang/${language}.json`)
            .then(response => response.json())
            .then(lang => {
                lang.forEach(element => {
                    if (element.section === "navigation") {
                        navBarHtml(element)
                    }
                    if (element.section === "footer") {
                        footer(element)
                    }
                })
            })
            .catch(error => console.error("Error al cargar el JSON de idiomas:", error));
        // Guardar el idioma seleccionado en una cookie
        setCookie('preferredLanguage', language, 30); // 30 días de expiración
    }
});

const projectsContainer = document.getElementById("projectsContainer");


// Cargar el JSON de proyectos

function navBarHtml(lang) {
    htmlNav = `<ul class="nav-list">
        <li class="nav-item"><a href="index.html" class="nav-link active">${lang.links_name[0]}</a></li>
        <li class="nav-item"><a href="https://wa.link/v1jz3e" class="nav-link" target="_blank">${lang.links_name[5]}</a>
        </li>
        <li class="nav-item">
            <select name="" id="change-language-button">
                <option value="spanish" data-lang="es">XD${lang.languages[0]}</option>
                <option value="english" data-lang="en">${lang.languages[1]}</option>
                <option value="russian" data-lang="ru">${lang.languages[2]}</option>
                <option value="japanese" data-lang="jp">${lang.languages[3]}</option>
            </select>
        </li>
        <li class="nav-item">
            <button id="change-theme-button">
                <img src="img/light.svg" alt="" height="18px">
            </button>
        </li>
    </ul>`
    const nav = document.getElementById('nav-menu')
    nav.innerHTML = htmlNav
}

function footer(lang) {
    htmlFooter = `<p>&copy; ${lang.text}</p>`
    const footer = document.getElementById('footer')
    footer.innerHTML = htmlFooter
}
// Función para crear una tarjeta de proyecto
function createProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const image = document.createElement("img");
    image.src = project.image_url;
    card.appendChild(image);

    const info = document.createElement("div");
    info.classList.add("project-info");

    const title = document.createElement("h3");
    title.textContent = project.title;
    info.appendChild(title);

    const shortDescription = document.createElement("p");
    shortDescription.textContent = project.short_description;
    info.appendChild(shortDescription);

    const languages = document.createElement("p");
    languages.classList.add("languages");
    languages.textContent = project.languages.join(", ");
    info.appendChild(languages);

    const detailsButton = document.createElement("button");
    detailsButton.textContent = project.button;
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
            <p class="modal-languages">${project.languages.join(", ")}</p>
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
}