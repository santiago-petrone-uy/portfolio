
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const nav = document.getElementById("main-navigation");
const sections = [
  { id: "intro", linkId: "intro-link" },
  { id: "system", linkId: "system-link" },
  { id: "portfolio", linkId: "portfolio-link" },
  { id: "contact", linkId: "contact-link" }
].map(({ id, linkId }) => ({
  section: document.getElementById(id),
  link: document.getElementById(linkId)
}));

function onTop(elementA, elementB) {
  const rectA = elementA.getBoundingClientRect();
  const rectB = elementB.getBoundingClientRect();

  return !(
    rectA.right < rectB.left ||
    rectA.left > rectB.right ||
    rectA.bottom < rectB.top ||
    rectA.top > rectB.bottom
  );
}

function updateLinks() {
  const isEndOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (isEndOfPage) {
    sections.forEach(({ link }) => {
      if (link.id === "portfolio-link") {
        link.classList.remove("selected");
      }
      if (link.id === "contact-link") {
        link.classList.add("selected");
      }
    });
  } 
  else {
    sections.forEach(({ section, link }) => {
      if (onTop(link, section)) {
        link.classList.add("selected");
      } else {
        link.classList.remove("selected");
      }
    });
  }
}

function updateDarkClass() {
  const systemSection = document.getElementById("system");
  if (onTop(nav, systemSection)) {
    nav.classList.add("dark-navigation");
  }
  else {
    nav.classList.remove("dark-navigation");
  }
}

document.addEventListener("scroll", () => {
  updateLinks();
  updateDarkClass();
});

window.addEventListener("resize", () => {
  updateLinks();
  updateDarkClass();
});

updateLinks(); // Initial update
updateDarkClass(); // Initial update