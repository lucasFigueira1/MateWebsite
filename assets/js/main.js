// Primer entrega: Prompt, if (condicional), funtions, for (bucle), class y objetos

// Choose theme when joining (To Change)
// let websiteTheme = prompt("Choose Theme: 1(Dark) or 2(Light)");
// let b = document.body;

// if (websiteTheme === "1") {
//   b.style.backgroundColor = "hsl(19, 16%, 15%)";
//   b.style.color = "hsl(19, 100%, 96%)";
// } else if (websiteTheme === "2") {
//   b.style.backgroundColor = "hsl(19, 100%, 96%)";
// } else {
//   b.style.backgroundColor = "hsl(19, 100%, 96%)";
// }

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

      document.body.classList.remove("stop-scrolling")
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
    arrow.style.display = "flex"
  } else {
    arrow.style.display = "none"
  }

  arrow.addEventListener("click", ()=> {
    document.documentElement.scrollTop = 0;
  })
}

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

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

