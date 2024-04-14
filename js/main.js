
// const path = window.location.pathname
// if(path === '/' || path === '/index.html')
// {
    
// }

let buttonTheme = document.getElementById('change-theme-button');
buttonTheme.addEventListener('click', () => {
    if (getCookie('preferredTheme') === 'light') {
        changeTheme('dark');
    }
    else {
        changeTheme('light');
    }
    console.log('Cambiar de '+ getCookie('preferredTheme'));
});

let buttonLanguage = document.getElementById('change-language-button');
buttonLanguage.addEventListener('change', () => {
    changeLanguage(buttonLanguage.value)
    console.log('Cambiar idioma a '+ buttonLanguage.value);
});
