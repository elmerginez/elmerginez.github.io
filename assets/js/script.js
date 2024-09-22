
let themechangerbtn = document.getElementById('themechanger')
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


// Verificar si ya hay un tema guardado en la cookie
let savedTheme = getCookie('preferredTheme');
let isDarkTheme = savedTheme === 'dark'; // Usa 'dark' o 'light' como texto
console.log(isDarkTheme);

// Cargar el tema por defecto
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
        logo.src = theme ? "assets/img/logo/light.svg" : "assets/img/logo/dark.svg";
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
                // if (element.section === "home") {
                //     homeHtml(element)
                // }
                // if (element.section === "about") {
                //     console.log("Datos para la sección 'about':", element);
                //     aboutHtml(element)
                // }
                // if (element.section === "portfolio") {
                //     portfolioHtml(element,language)
                // }
                // if (element.section === "services") {
                //     servicesHtml(element)
                // }
                // if (element.section === "contact") {
                //     contactHtml(element)
                // }
                // if (element.section === "footer") {
                //     footer(element)
                // }
            })
        })
        .catch(error => console.error("Error al cargar el JSON de idiomas:", error));
    // Actualizar el idioma del documento

    // Guardar el idioma seleccionado en una cookie
    setCookie('preferredLanguage', language, 30); // 30 días de expiración
}
function navigation(lang){
    console.log(lang)
let navigationElements = document.querySelectorAll('.anchor_nav')
navigationElements.forEach(element => {
    console.log(element.children)
    for (let index = 0; index < element.children.length; index++) {
        console.log(element.children[index])
        element.children[index].textContent = lang.sections[index]
    }
    // element.children.forEach((e,index) => {
    //     e[index].texContent = lang.sections[index]
    // })
})
console.log(navigationElements)
}
navigation('hola')

function home(lang){
    
}
function about(lang){
    
}
function service(lang){
    
}
function portfolio(lang){
    
}
function blog(lang){
    
}
function contact(lang){
    
}