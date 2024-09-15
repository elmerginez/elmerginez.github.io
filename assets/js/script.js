let theme = true
function toggleTheme(){
    let body = document.body
    let logos = document.querySelectorAll('.theme-update')
    
    if (theme) {
        body.classList.add('dark')
        theme = false
    } else {
        body.classList.remove('dark')
        theme = true
    }
    logos.forEach(logo => {
        logo.src = theme ? "assets/img/logo/light.svg" : "assets/img/logo/dark.svg";
      });
}