// NAVBAR AND TAB FUNCTIONS
let homeBtn = document.getElementById('homebtn');
let aboutBtn = document.getElementById('aboutbtn');
let briefcaseBtn = document.getElementById('briefcasebtn');
let contactBtn = document.getElementById('contactbtn');
let blogBtn = document.getElementById('blogbtn');

let home = document.getElementById('home');
let about = document.getElementById('about');
let briefcase = document.getElementById('briefcase');
let contact = document.getElementById('contact');
let blog = document.getElementById('blog');

let principal = document.getElementById('principal');

homeBtn.onclick = homeFunction;
aboutBtn.onclick = aboutFunction;
briefcaseBtn.onclick = briefcaseFunction;
contactBtn.onclick = contactFunction;
blogBtn.onclick = blogFunction;

function homeFunction() {
    homeBtn.classList.add("current")
    aboutBtn.classList.remove("current")
    briefcaseBtn.classList.remove("current")
    contactBtn.classList.remove("current")
    blogBtn.classList.remove("current")

    home.style.display = "block";
    about.style.display = "none";
    briefcase.style.display = "none";
    contact.style.display = "none";
    blog.style.display = "none";
}
function aboutFunction() {
    homeBtn.classList.remove("current")
    aboutBtn.classList.add("current")
    briefcaseBtn.classList.remove("current")
    contactBtn.classList.remove("current")
    blogBtn.classList.remove("current")

    home.style.display = "none";
    about.style.display = "block";
    briefcase.style.display = "none";
    contact.style.display = "none";
    blog.style.display = "none";
}
function briefcaseFunction() {
    homeBtn.classList.remove("current")
    aboutBtn.classList.remove("current")
    briefcaseBtn.classList.add("current")
    contactBtn.classList.remove("current")
    blogBtn.classList.remove("current")

    home.style.display = "none";
    about.style.display = "none";
    briefcase.style.display = "block";
    contact.style.display = "none";
    blog.style.display = "none";
}
function contactFunction() {
    homeBtn.classList.remove("current")
    aboutBtn.classList.remove("current")
    briefcaseBtn.classList.remove("current")
    contactBtn.classList.add("current")
    blogBtn.classList.remove("current")

    home.style.display = "none";
    about.style.display = "none";
    briefcase.style.display = "none";
    contact.style.display = "block";
    blog.style.display = "none";

}
function blogFunction() {
    homeBtn.classList.remove("current")
    aboutBtn.classList.remove("current")
    briefcaseBtn.classList.remove("current")
    contactBtn.classList.remove("current")
    blogBtn.classList.add("current")

    home.style.display = "none";
    about.style.display = "none";
    briefcase.style.display = "none";
    contact.style.display = "none";
    blog.style.display = "block";

    principal.classList.remove('tab-panel_list')
    principal.classList.add('tab-panel_list')
}