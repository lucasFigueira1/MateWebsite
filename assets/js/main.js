// Segunda entrega: Prompt, if (condicional), funtions, for (bucle), class y objetos, Arrays, DOM

// Choose theme when joining (*To Change*)
let websiteTheme = prompt("Choose Initial Theme: 1(Dark) or 2(Light)");

if (websiteTheme === "1") {
  document.body.classList.toggle("dark-theme");
} else if (websiteTheme === "2") {
  document.body.style.backgroundColor = "hsl(19, 100%, 96%)";
} else {
  document.body.classList.toggle("dark-theme");
}

/*===== Uso de arrays (*To change*) =====*/
let showCatalog = prompt(
  "If you want to take a look at the catalog, write: Mates or Bombillas or Materas"
);
let Catalog = [
  {
    name: "Mates",
    products: [
      { pname: "Mate Camionero", price: 2900 },
      { pname: "Mate Torpedo", price: 2400 },
      { pname: "Mate Imperial", price: 3400 },
    ],
  },
  {
    name: "Bombillas",
    products: [
      { pname: "Acero", price: 1000 },
      { pname: "Alpaca", price: 1200 },
      { pname: "Bronce", price: 800 },
    ],
  },
  {
    name: "Materas",
    products: [
      { pname: "Mochila Matera + Porta Notebook", price: 20000 },
      { pname: "Canasta de cuero", price: 7000 },
      { pname: "Bolso Matero", price: 7000 },
    ],
  },
];

function filterCatalog() {
  let keyword = showCatalog;
  const otroFiltrado = Catalog.filter((item) => item.name.includes(keyword));
  alert(JSON.stringify(otroFiltrado));
}
filterCatalog();

// Burger Menú
const burgerMenu = document.querySelector(".bars-menu");
let line1 = document.querySelector(".line1__bars-menu");
let line2 = document.querySelector(".line2__bars-menu");
let line3 = document.querySelector(".line3__bars-menu");
let navigationMenu = document.querySelector(".Nav");

burgerMenu.addEventListener("click", () => {
  animatedBars();
  displayNavMenu();
  disableScroll();
});

function animatedBars() {
  line1.classList.toggle("activeline1__bars-menu");
  line2.classList.toggle("activeline2__bars-menu");
  line3.classList.toggle("activeline3__bars-menu");
}

function displayNavMenu() {
  navigationMenu.classList.toggle("nav-active");

  let navActiveLinks = document.querySelectorAll(".nav-item");
  for (let i = 0; i < navActiveLinks.length; i++) {
    navActiveLinks[i].addEventListener("click", () => {
      navigationMenu.classList.remove("nav-active");

      line1.classList.remove("activeline1__bars-menu");
      line2.classList.remove("activeline2__bars-menu");
      line3.classList.remove("activeline3__bars-menu");

      document.body.classList.remove("stop-scrolling");
    });
  }
}
// Stop Scrolling while nav is active (Mobile)
function disableScroll() {
  document.body.classList.toggle("stop-scrolling");
}

// Back to top arrow
let calcScrollValue = () => {
  let arrow = document.querySelector(".button_back-to-top");
  let pos = document.documentElement.scrollTop;

  if (pos > 300) {
    arrow.style.display = "flex";
  } else {
    arrow.style.display = "none";
  }

  arrow.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

/*====== DARK LIGHT THEME ======*/
const themeButton = document.getElementById("theme-button");
const iconTheme = "ri-sun-line";

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeButton.classList.toggle(iconTheme);
});

// Shopping Cart
// When confirmed the buy, is going to add the amount of the price plus iva
class ProductAddedToCart {
  constructor(name, material, price) {
    this.name = name;
    this.material = material;
    this.price = price;
  }
  productPricePlusIva() {
    this.price = this.price * 1.21;
  }
}

let prod1 = new ProductAddedToCart("Mate Camionero", "Calabaza", 3220);
prod1.productPricePlusIva();
