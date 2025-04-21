
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

/************** Dark Mode switcher start **************/
const bodyParent = document.querySelector('body');
const button = document.querySelector('.theme-toggler');
function toggleDark() {
  if (bodyParent.classList.contains('dark-theme')) {
    bodyParent.classList.remove('dark-theme');
    localStorage.setItem("theme", "light");
  } else {
    bodyParent.classList.add('dark-theme');
    localStorage.setItem("theme", "dark");
  }
}
if (localStorage.getItem("theme") === "dark") {
  bodyParent.classList.add('dark-theme');
}
document.querySelector('.theme-toggler').addEventListener('click', toggleDark);

/************** Smooth Scroll Intialisation start **************/
// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 768px)')
// Check if the media query is true
if (mediaQuery.matches) {
  let smoother = ScrollSmoother.create({
    smooth: 3,
    normalizeScroll: true,
    effects: true,
  });
}
/************** Smooth Scroll Intialisation end **************/

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 768px)": function () {
    /************** Animation on scroll for ipad and dekstop view start **************/
    gsap.utils.toArray('.animate-child').forEach(animateChild => {
      gsap.to(animateChild, {
        scrollTrigger: {
          trigger: animateChild,
          start: 'top 80%',
          once: true,
          toggleClass: 'trigger',
        }
      });
    });
    /************** Animation on scroll for ipad and dekstop view end **************/
    /************** Service page animation on scroll for Services blocks start **************/
    const headerHeight = document.getElementById("header").offsetHeight - 1;
    gsap.utils.toArray(".service-details-container:not(.last)").forEach((serviceBlock) => {
      ScrollTrigger.create({
        trigger: serviceBlock,
        start: `top ${headerHeight}`,
        end: `bottom ${headerHeight}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        toggleClass: 'active',
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
      });
    });
    /************** Service page animation on scroll for Services blocks end **************/



  },
  // mobile
  "(max-width: 767px)": function () {
    /************** Animation on scroll for mobile view start **************/
    gsap.utils.toArray('.animate-child').forEach(animateChild => {
      gsap.to(animateChild, {
        scrollTrigger: {
          trigger: animateChild,
          start: 'top 100%',
          once: true,
          toggleClass: 'trigger',
        }
      });
    });
    /************** Animation on scroll for mobile view end **************/

    /************** Animate large text behind heading on mobile view start **************/
    gsap.utils.toArray('.heading-large h2').forEach(largeTextMob => {
      gsap.to(largeTextMob, {
        y: '-50%',
        ease: 'linear',
        scrollTrigger: {
          trigger: largeTextMob,
          start: 'top bottom',
          scrub: true,
        }
      });
    });
    /************** Animate large text behind heading on mobile view start **************/

  }
});

/************** Scroll to script for Home hero start **************/
if (document.querySelector("#btn-hero")) {
  const scrollButton = document.querySelector('#btn-hero');
  const sectionCases = document.querySelector('#featured-work');
  scrollButton.addEventListener('click', () => {
    console.warn(sectionCases);
    gsap.to(window, {
      duration: 0.5,
      scrollTo: sectionCases
    });
  });
}
/************** Scroll to script for Home hero end **************/

/************** Swiper js script for all sliders start **************/
/* Testimonial slider */
if (document.querySelector(".testimonial-slider")) {
  var testimonialSlider = new Swiper(".testimonial-slider", {
    slidesPerView: "auto",
    centeredSlides: false,
    spaceBetween: 80,
    loop: false,
    slideToClickedSlide: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
        centeredSlides: false,
      },
      768: {
        spaceBetween: 80,
        centeredSlides: true,
      }
    }
  });
}

/* Testimonial 2 slider */
if (document.querySelector(".testimonial2-slider")) {
  var testimonial2Slider = new Swiper(".testimonial2-slider", {
    slidesPerView: 1,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

/* Slider for mobile view only */
if (document.querySelector(".mobile-slider")) {
  var init = false;
  var swiperMob;
  function mobSlider() {
    if (window.innerWidth <= 767) {
      if (!init) {
        init = true;
        swiper = new Swiper(".mobile-slider", {
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 40,
          loop: false,
        });
      }
    } else if (init) {
      swiperMob.destroy();
      init = false;
    }
  }
  mobSlider();
  window.addEventListener("resize", mobSlider);

}

/************** Swiper js script for all sliders end **************/



/************** Add class to body when navigation open below 1200px screensize start **************/
if (document.querySelector(".navbar-toggler")) {
  document.querySelector(".navbar-toggler").addEventListener("click", function () {
    document.querySelector("body").classList.toggle("nav-open");
  });
}

/************** Add class to body when navigation open below 1200px screensize end **************/

/************** Add class to body when user start to scroll**************/
window.onscroll = function () {
  fixHeader()
};
var body = document.getElementsByTagName("body")[0];
var sticky = body.offsetTop + 10;

function fixHeader() {
  if (window.pageYOffset > sticky) {
    body.classList.add("fixed");
  } else {
    body.classList.remove("fixed");
  }
}
/************** Add class to body when user start to scroll**************/


/************** Bootstrap form validation start **************/
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();
/************** Bootstrap form validation end **************/



/************** Script for text marquee start **************/
if (document.querySelector(".text-marquee")) {


  let loops = gsap.utils.toArray('.text-marquee-wrapper').map((line, i) => {
    const links = line.querySelectorAll(".marquee-text");
    return horizontalLoop(links, {
      repeat: -1,
      speed: 0.5,
      reversed: false,
      paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px"))
    });
  });

  let currentScroll = 0;
  let scrollDirection = 1;

  window.addEventListener("scroll", () => {
    let direction = (window.pageYOffset > currentScroll) ? 1 : -1;
    if (direction !== scrollDirection) {
      loops.forEach(tl => {
        gsap.to(tl, { timeScale: direction, overwrite: true });
      });
      scrollDirection = direction;
    }
    currentScroll = window.pageYOffset;
  });


  /*
  This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
  
  Features:
  - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
  - When each item animates to the left or right enough, it will loop back to the other side
  - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
  - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
  */
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
        return xPercents[i];
      }
    });
    gsap.set(items, { x: 0 });
    totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = xPercents[i] / 100 * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
        .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex + 1, vars);
    tl.previous = vars => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

}
/************** Script for text marquee end **************/





function miwie_tm_preloader() {
  "use strict";

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  var preloader = document.getElementById("preloader");

  if (!preloader) return;

  if (!isMobile) {
    setTimeout(function () {
      preloader.classList.add("preloaded");
    }, 1000);
    setTimeout(function () {
      preloader.remove();
    }, 2000);
  } else {
    preloader.remove();
  }
}

function miwie_tm_my_load() {
  "use strict";
  var speed = 500;
  setTimeout(function () {
    miwie_tm_preloader();
  }, speed);
}

miwie_tm_my_load();

function miwie_tm_cursor() {
  "use strict";

  const myCursor = document.querySelectorAll(".mouse-cursor");

  if (myCursor.length) {
    const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
    
    let mouseX = 0,
        mouseY = 0,
        isMoving = false;

    window.onmousemove = function (event) {
      if (!isMoving) {
        t.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
      e.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    // Elementos que activan hover del cursor personalizado
    const hoverElements = document.querySelectorAll("a, .miwie_tm_testimonials .avatars ul li, .cursor-pointer");

    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        e.classList.add("cursor-hover");
        t.classList.add("cursor-hover");
      });

      el.addEventListener("mouseleave", (event) => {
        // Si es un <a> dentro de un .cursor-pointer, no quitamos la clase
        const isLinkInsideCursorPointer = event.target.tagName === "A" && event.target.closest(".cursor-pointer");
        if (!isLinkInsideCursorPointer) {
          e.classList.remove("cursor-hover");
          t.classList.remove("cursor-hover");
        }
      });
    });

    e.style.visibility = "visible";
    t.style.visibility = "visible";
  }
}

miwie_tm_cursor()

function miwie_tm_nav_bg() {
  "use strict";
  window.addEventListener("scroll", function () {
    const menu = document.querySelector(".miwie_tm_header");
    const progress = document.querySelector(".progressbar");
    const scrollTop = window.scrollY;

    if (scrollTop >= 100) {
      menu?.classList.add("animate");
      progress?.classList.add("animate");
    } else {
      menu?.classList.remove("animate");
      progress?.classList.remove("animate");
    }
  });
}

function miwie_tm_totop() {
  "use strict";
  const text = document.querySelector(".progressbar .text");
  if (text) {
    text.style.bottom = `${105 + text.offsetWidth}px`;
  }

  const link = document.querySelector(".progressbar a");
  if (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function miwie_tm_progress_line() {
  "use strict";
  const line = document.querySelector(".progressbar .line");
  if (!line) return;

  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  const value = (scrollTop / (documentHeight - windowHeight)) * 100;
  line.style.height = `${value}%`;
}
window.addEventListener("scroll", miwie_tm_progress_line);
document.addEventListener("DOMContentLoaded", function () {
  miwie_tm_nav_bg();
  miwie_tm_totop();
  miwie_tm_progress_line();
});
