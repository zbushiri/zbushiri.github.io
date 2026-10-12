/* Menu and slideshow */

/* Menu */
const toggleNav = document.getElementById("toggle-nav");
const menuLinks = document.getElementById("menu-links");

toggleNav.onclick = () => {
  menuLinks.classList.toggle("hide-small");
  const menuIsOpen = !menuLinks.classList.contains("hide-small");
  toggleNav.setAttribute("aria-expanded", menuIsOpen);
};

/* Slideshow items */
const slides = [
  {
    title: "Anime Shelf",
    text: "Find anime based on genres you enjoy.",
    image: "images/bookshelf.avif",
    alt: "Bookshelf filled with books",
    fit: "cover",
    link: "anime.html",
  },
  {
    title: "Upcoming Releases",
    text: "See what is coming next and when it arrives.",
    image: "images/soon.jpg",
    alt: "Upcoming anime release",
    fit: "cover",
    link: "upcoming.html",
  },
  {
    title: "Trailer Room",
    text: "Watch fresh anime trailers from Crunchyroll.",
    image: "images/crunchyroll.png",
    alt: "Crunchyroll anime trailers",
    fit: "cover",
    link: "trailers.html",
  },
  {
    title: "About Me",
    text: "Meet the person behind Cozy Corner.",
    image: "images/me.jpg",
    alt: "Portrait for the About Me page",
    fit: "contain",
    link: "about.html",
  },
  {
    title: "FAQ",
    text: "Find answers to common questions about Cozy Corner.",
    image: "images/what.jpg",
    alt: "Question marks representing frequently asked questions",
    fit: "contain",
    link: "faq.html",
  },
];

/* Slideshow parts */
const slideImage = document.getElementById("slide-image");
const slideTitle = document.getElementById("slide-title");
const slideText = document.getElementById("slide-text");
const slideLink = document.getElementById("slide-link");
const previousSlide = document.getElementById("previous-slide");
const nextSlide = document.getElementById("next-slide");
let slideNumber = 0;

/* Shows one slide */
const showSlide = () => {
  const slide = slides[slideNumber];
  slideImage.src = slide.image;
  slideImage.alt = slide.alt;
  slideImage.style.objectFit = slide.fit;
  slideTitle.textContent = slide.title;
  slideText.textContent = slide.text;
  slideLink.href = slide.link;
};

/* Slideshow buttons */
if (slideImage) {
  nextSlide.onclick = () => {
    slideNumber++;
    if (slideNumber === slides.length) slideNumber = 0;
    showSlide();
  };

  previousSlide.onclick = () => {
    slideNumber--;
    if (slideNumber < 0) slideNumber = slides.length - 1;
    showSlide();
  };
}
