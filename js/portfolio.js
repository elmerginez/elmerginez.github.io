document.addEventListener("DOMContentLoaded", function() {
    const projectsContainer = document.getElementById("projectsContainer");

    // Cargar el JSON de proyectos
    fetch("projects.json")
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
            <h2>${project.title}</h2>
            <img src="${project.image_url}" alt="${project.title}">
            <p>${project.detailed_description}</p>
            <p>Lenguajes: ${project.languages.join(", ")}</p>
            <p>Estado: ${project.status}</p>
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
