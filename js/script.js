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
