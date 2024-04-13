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

  const savedTheme = getCookie('preferredTheme');

  if (savedTheme) {
    changeTheme(savedTheme);
  }

  const savedLanguage = getCookie('preferredLanguage');

  if (savedLanguage) {
    changeLanguage(savedLanguage);
  }

  function changeTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }

    setCookie('preferredTheme', theme, 30);
  }

  function changeLanguage(language) {
    document.documentElement.lang = language;

    setCookie('preferredLanguage', language, 30);
  }