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
        if(element.section === "navigation"){
          navBarHtml(element)
        }
        if(element.section === "footer"){
          footer(element)
        }
      })
    })
    .catch(error => console.error("Error al cargar el JSON de idiomas:", error));
  // Guardar el idioma seleccionado en una cookie
  setCookie('preferredLanguage', language, 30); // 30 días de expiración
}