document.addEventListener("DOMContentLoaded", function() {
    const projectsContainer = document.getElementById("projectsContainer");

    // Cargar el JSON de proyectos
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
        languages.textContent = "Lenguajes: " + project.languages.join(", ");
        info.appendChild(languages);

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Detalles";
        detailsButton.classList.add("detail-btn")
        detailsButton.addEventListener("click", function() {
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
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Cierra el modal cuando se hace clic fuera del contenido
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
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

// Verificar si ya hay un idioma guardado en la cookie
const savedLanguage = getCookie('preferredLanguage');

// Si hay un idioma guardado, cargar ese idioma por defecto
if (savedLanguage) {
    changeLanguage(savedLanguage);
}

function changeLanguage(language) {
    fetch(`lang/${language}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('welcomeMessage').textContent = data.welcome_message;
            // Aquí actualiza el resto de los elementos de la página con los textos correspondientes

            // Guardar el idioma seleccionado en una cookie
            setCookie('preferredLanguage', language, 30); // 30 días de expiración
        })
        .catch(error => console.error('Error loading language file:', error));
}