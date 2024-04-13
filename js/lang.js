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