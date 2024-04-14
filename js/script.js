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
    let savedTheme = getCookie('preferredTheme');

    // Si hay un tema guardado, cargar ese tema por defecto
    if (savedTheme) {
        changeTheme(savedTheme);
    }

    // Verificar si ya hay un idioma guardado en la cookie
    let savedLanguage = getCookie('preferredLanguage');

    // Si hay un idioma guardado, cargar ese idioma por defecto
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }

    function changeTheme(theme) {

        // Guardar el tema seleccionado en una cookie
        setCookie('preferredTheme', theme, 30); // 30 días de expiración
    }

    function changeLanguage(language) {
        console.log("Cambiando idioma a:", language);
        document.documentElement.lang = language;
        fetch(`lang/${language}.json`)
            .then(response => response.json())
            .then(lang => {
                console.log("Datos de idioma cargados:", lang);

                lang.forEach(element => {
                    if (element.section === "navigation") {
                        navHtml(element)
                    }
                    if (element.section === "home") {
                        homeHtml(element)
                    }
                    if (element.section === "about") {
                        console.log("Datos para la sección 'about':", element);
                        aboutHtml(element)
                    }
                    if (element.section === "portfolio") {
                        portfolioHtml(element,language)
                    }
                    if (element.section === "services") {
                        servicesHtml(element)
                    }
                    if (element.section === "contact") {
                        contactHtml(element)
                    }
                    if (element.section === "footer") {
                        footer(element)
                    }
                })
            })
            .catch(error => console.error("Error al cargar el JSON de idiomas:", error));
        // Actualizar el idioma del documento

        // Guardar el idioma seleccionado en una cookie
        setCookie('preferredLanguage', language, 30); // 30 días de expiración
    }

    function navHtml(lang) {
        htmlNav = `<ul class="nav-list">
            <li class="nav-item"><a href="index.html" class="nav-link active">${lang.links_name[0]}</a></li>
            <li class="nav-item"><a href="#about" class="nav-link">${lang.links_name[1]}</a></li>
            <li class="nav-item"><a href="#portfolio" class="nav-link">${lang.links_name[2]}</a></li>
            <li class="nav-item"><a href="#services" class="nav-link">${lang.links_name[3]}</a></li>
            <li class="nav-item"><a href="#contact" class="nav-link">${lang.links_name[4]}</a></li>
            <li class="nav-item">
                <select name="" id="change-language-button">
                    <option value="es" ${getCookie('preferredLanguage') === 'es' ? 'selected' : ''}>🇪🇸 ${lang.languages[0]}</option>
                    <option value="en" ${getCookie('preferredLanguage') === 'en' ? 'selected' : ''}>🇺🇸 ${lang.languages[1]}</option>
                    <option value="ru" ${getCookie('preferredLanguage') === 'ru' ? 'selected' : ''}>🇷🇺 ${lang.languages[2]}</option>
                    <option value="jp" ${getCookie('preferredLanguage') === 'jp' ? 'selected' : ''}>🇯🇵 ${lang.languages[3]}</option>
                </select>
            </li>
            <li class="nav-item">
                <button id="change-theme-button" style="border: none; background-color: transparent; cursor: pointer;">
                    <img src="img/${savedTheme}.svg" alt="" height="18px">
                </button>
            </li>
        </ul>`
        const nav = document.getElementById('nav-menu')
        nav.innerHTML = htmlNav
        const changeLanguageButton = document.getElementById('change-language-button');
        changeLanguageButton.addEventListener('change', function () {
            const selectedLanguage = changeLanguageButton.value;
            changeLanguage(selectedLanguage);
            changeLanguageButton.value = selectedLanguage;
            console.log(selectedLanguage)
        })
        const changeThemeButton = document.getElementById('change-theme-button');
        changeThemeButton.addEventListener('click', function () {
            const currentTheme = getCookie('preferredTheme');
            let newTheme = 'dark';
            if (currentTheme === 'dark') {
                newTheme = 'light';
            }
            changeThemeButton.innerHTML = `<img src="img/${newTheme}.svg" alt="" height="18px">`;
            // document.body.style.backgroundColor = newTheme === 'dark' ? '#121212' : '#ffffff';
            // document.body.style.color = newTheme === 'dark' ? '#ffffff' : '#000000';
            changeTheme(newTheme);
        })
    }
    function homeHtml(lang) {
        textHtml = `<h1 class="home-title headline push">
        ${lang.greeting[0]},
        <br>
        ${lang.greeting[1]}
        <span class="home-title-color">
            ${lang.greeting[2]}
        </span>
        
        <span class="words-wrapper">
            <b class="is-visible">${lang.role[0]}</b>
            <b>${lang.role[1]}</b>
        </span>
    </h1>`
    document.getElementById("home-left").innerHTML = textHtml;
    }
    function aboutHtml(lang) {
        textHtml = `<h2>${lang.title}</h2>
        <div class="about-container">
            <div class="about-left">
                <img src="img/elmerginez (1).webp" alt="elmer ginez miwi">
            </div>
            <div class="about-right">
                <h2>${lang.sub_title}</h2>
                <p>
                    ${lang.text}
                </p>
                <div>
                    <a href="#" class="button">${lang.button}</a>
                </div>
            </div>
        </div>`
        document.getElementById("about").innerHTML = textHtml;
    }
    function portfolioHtml(lang,language) {
        textHtml = `<h2 class="heading">${lang.title}</h2>
        <p>${lang.text}<br><br></p>

        <div class="portfolio-container" id="portfolio-container">
            <!-- Los tres primeros proyectos -->
        </div>
        <div class="portfolio-all">
            <a href="portfolio.html" class="button">${lang.button}</a>
        </div>`
        document.getElementById("portfolio").innerHTML = textHtml;

        // Fetch proyectos aquí para asegurarse de que siempre se carguen
        fetch(`lang/projects${language}.json`)
            .then(response => response.json())
            .then(projectsData => {
                console.log("Datos de proyectos cargados:", projectsData);
                const portfolioContainer = document.getElementById('portfolio-container');
                projectsData.slice(0, 3).forEach(project => {
                    
                    const projectCard = createProjectCard(project);
                    portfolioContainer.appendChild(projectCard);
                });
            })
            .catch(error => console.error("Error al cargar el JSON de proyectos:", error));
    }
    function servicesHtml(lang) {
        textHtml = `<h2 class="heading">${lang.title}</h2>
        <p style="text-align: center;">${lang.text}</p><br>
        <div class="services-container">
            <div class="services-box">
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M6 7.9502H6.01M9 7.9502H9.01M12 7.9502H12.01M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                            stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </g>
                </svg>
                <h3>${lang.services[0].title}</h3>
                <p>
                    ${lang.services[0].short_text}
                </p>
                <a href="#" class="button">${lang.services[0].button}</a>
            </div>

            <div class="services-box">
                <svg width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M12 18H12.01M11 6H13M9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V6.2C18 5.0799 18 4.51984 17.782 4.09202C17.5903 3.71569 17.2843 3.40973 16.908 3.21799C16.4802 3 15.9201 3 14.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.07989 21 9.2 21Z"
                            stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </g>
                </svg>
                <h3>${lang.services[1].title}</h3>
                <p>
                    ${lang.services[1].short_text}
                </p>
                <a href="#" class="button">${lang.services[1].button}</a>
            
            </div>
        </div>`
        document.getElementById("services").innerHTML = textHtml;
    }
    function contactHtml(lang) {
        textHtml = `<h2 class="section-title">${lang.title}</h2>
        <div class="contact-container">
            <div class="contact-left">
                <div class="contact-info">
                    <h3>${lang.sub_title}</h3>
                    <p>
                        ${lang.text}
                    </p>
                    <p>${lang.sub_text[0]}</p>
                    <a href="mailto:freddgineztm@gmail.com">freddgineztm@gmail.com</a>
                </div>
                <div class="contact-social">
                    <p>${lang.sub_text[1]}</p>
                    <ul>
                        <li><a href="https://wa.link/v1jz3e" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        </li>
                        <li><a href="https://t.me/miwicode" target="_blank" rel="noopener noreferrer">Telegram</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`
        document.getElementById("contact").innerHTML = textHtml;
    }
    function footer(lang) {
        htmlFooter = `<p>&copy; ${lang.text}</p>`
        const footer = document.getElementById('footer')
        footer.innerHTML = htmlFooter
    }


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
            if (event.target === modal) {
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
