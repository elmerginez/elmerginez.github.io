const button = document.getElementById('languageButton');
const options = document.getElementById('languageOptions');
let themechangerbtn = document.getElementById('themechanger')


button.addEventListener('click', function (event) {
    options.classList.toggle('hidden');
    options.classList.toggle('visible');
    event.stopPropagation(); // Evitar que el clic se propague
});

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function (event) {
        const selectedLanguage = this.dataset.lang;
        console.log('Idioma seleccionado:', selectedLanguage);
        changeLanguage(selectedLanguage)
        // Cierra el dropdown
        options.classList.add('hidden');
        options.classList.remove('visible');

        event.stopPropagation(); // Evitar que el clic se propague
    });
});

// Cierra el dropdown si se hace clic fuera de él
document.addEventListener('click', function (event) {
    if (!document.querySelector('.language-dropdown').contains(event.target)) {
        options.classList.add('hidden');
        options.classList.remove('visible');
    }
});

// Verificar si ya hay un tema guardado en la cookie
let savedTheme = getCookie('preferredTheme');
let isDarkTheme = savedTheme === 'dark'; // Usa 'dark' o 'light' como texto

changeTheme(isDarkTheme);

themechangerbtn.addEventListener('click', () => {
    // Alternar el estado del tema
    isDarkTheme = !isDarkTheme; // Cambia el estado
    changeTheme(isDarkTheme);
});

function changeTheme(theme) {
    let body = document.body;
    let logos = document.querySelectorAll('.theme-update');

    if (theme) {
        body.classList.add('dark');
        setCookie('preferredTheme', 'dark', 30); // Guardar como 'dark'
    } else {
        body.classList.remove('dark');
        setCookie('preferredTheme', 'light', 30); // Guardar como 'light'
    }

    logos.forEach(logo => {
        logo.src = !theme ? "assets/img/logo/light.svg" : "assets/img/logo/dark.svg";
    });
}

// Verificar si ya hay un idioma guardado en la cookie
let savedLanguage = getCookie('preferredLanguage');
changeLanguage(savedLanguage || 'en');

function changeLanguage(language) {
    console.log("Cambiando idioma a:", language);
    document.documentElement.lang = language;
    fetch(`lang/${language}.json`)
        .then(response => response.json())
        .then(lang => {
            console.log("Datos de idioma cargados:", lang);

            lang.forEach(element => {
                if (element.section === "navigation") {
                    navigation(element)
                }
                if (element.section === "home") {
                    home(element)
                }
                if (element.section === "about") {
                    about(element)
                }
            })
        })
        .catch(error => console.error("Error al cargar el JSON de idiomas:", error));
    setCookie('preferredLanguage', language, 30); // 30 días de expiración
}

function navigation(lang) {
    let navigationElements = document.querySelectorAll('.navixd')
    
    navigationElements.forEach((e,i) => {
        e.textContent = lang.sections[i]
    })
    let langs = document.querySelectorAll('.language-option')
    langs.forEach((e, i) => {
        e.textContent = lang.languages[i]
    })
}

function home(lang) {
    let homeElements = document.querySelectorAll('.homixd')
    homeElements[1].textContent = lang.role
    homeElements[2].textContent = lang.text
    homeElements[3].innerHTML = lang.button[0] + ' <img class="svg" src="assets/img/svg/send.svg"/>'
    homeElements[4].innerHTML = lang.button[1] + ' <img class="svg" src="assets/img/svg/top-arrow.svg">';
    homeElements[5].textContent = lang.button[2]
    console.log(homeElements)
}

function about(lang) {
    let aboutElements = document.querySelectorAll('.aboutixd')
    console.log(aboutElements)
    aboutElements[0].textContent = lang.sub_title
    aboutElements[1].textContent = lang.title
    aboutElements[2].textContent = lang.text
    aboutElements[3].innerHTML = lang.button + ' <img class="svg" src="assets/img/svg/paper.svg">'
}


function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    const cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=None;Secure";
    document.cookie = cookie;
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