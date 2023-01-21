/*=============== BURGER MENU ===============*/
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

/*=============== STOP SCROLLING WHILE NAV IS ACTIVE (MOBILE) ===============*/
function disableScroll() {
  document.body.classList.toggle("stop-scrolling");
}

/*=============== SHOPPING CART ACTIVE ===============*/
const bag = document.querySelector(".bag-container");
const shoppingCartBox = document.querySelector(".shopping-cart-box");

bag.addEventListener("click", () => {
  shoppingCartBox.classList.toggle("cart-box-active");
});
/*=============== FIX NAV WHEN SCROLL IS DETECTED ===============*/
const fixNavWhenScrolling = () => {
  let fixNav = document.getElementById("header");
  let pos = document.documentElement.scrollTop;

  if (pos >= 50) {
    fixNav.classList.add("fixedHeader");
    fixNav.classList.remove("container");
    shoppingCartBox.classList.add("cart-box-fixed");
  } else {
    fixNav.classList.remove("fixedHeader");
    fixNav.classList.add("container");
    shoppingCartBox.classList.remove("cart-box-fixed");
  }
};
window.addEventListener("scroll", fixNavWhenScrolling);

/*=============== BACK TO TOP ARROW ===============*/
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

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: "2500",
  delay: "400",
});

sr.reveal(`.hero_text-col`, { origin: "bottom" });
sr.reveal(`.hero_image-col`, { origin: "top" });
sr.reveal(`.about-text-col`);
sr.reveal(`.about-img-col`);
sr.reveal(`.popular-subtitle`);
sr.reveal(`.popular-title`);
sr.reveal(`.popular-card`);
sr.reveal(`.recently-text-col`);
sr.reveal(`.recently-img-col`);
sr.reveal(`.newsletter-data`);
sr.reveal(`.newsletter-img`);

// SUCCESS MESSAGE WHEN ADDING TO CART
let addToCartBtn;
let cartTable;
let emptyCart = [];

let bagLength = document.querySelector('.items-quantity')

// Getting the Catalog products
const catalogArticleWrapper = document.getElementById("catalog");

const gettingTheProducts = async () => {
  const resp = await fetch(`./assets/catalog-products/catalog-items.json`);
  const data = await resp.json();

  data.forEach((post) => {
    const articleBody = document.querySelector(".popular-container");
    articleBody.innerHTML += `
    <article class="popular-card">
    <img
      class="popular-img"
      src="${post.img}"
      alt="mate image"
    />

    <h3 class="popular-name">${post.title}</h3>

    <span class="popular-button">
      <span class="popular-explore">${post.price}</span>
    </span>
    <a class="bag-button">
      <i class="ri-shopping-bag-line"></i>
    </a>
  </article>    
    `;
    catalogArticleWrapper.append(articleBody);
  });
};

gettingTheProducts()
  .then(waitAndBuy);

function waitAndBuy() {
  addToCartBtn = document.querySelectorAll(".bag-button");
  cartTable = document.querySelector(".cart-body");

  addToCartBtn.forEach((cartbtn) => {
    cartbtn.addEventListener("click", addItemToCart);
  });
}

function addItemToCart(e) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "<h2 style='color:#2c2420'>Added to Cart</h2>",
  });

  // Getting the info of the clicked btn
  const clickedBtn = e.target;
  const clickedItem = clickedBtn.closest(".popular-card");
  const itemTitle = clickedItem.querySelector(".popular-name").textContent;
  const itemPrice = clickedItem.querySelector(".popular-explore").textContent;
  const itemImage = clickedItem.querySelector(".popular-img").src;

  const newItem = {
    title: itemTitle,
    price: itemPrice,
    img: itemImage,
    quantity: 1,
  };

  newItemToCart(newItem);
}

function newItemToCart(newItem) {
  const inputElement = cartTable.getElementsByClassName("item-quantity-cart");

  for (let i = 0; i < emptyCart.length; i++) {
    if (emptyCart[i].title.trim() === newItem.title.trim()) {
      emptyCart[i].quantity++;

      const inputValue = inputElement[i];
      inputValue.value++;

      cartTotalPrice();

      return null;
    }
  }

  emptyCart.push(newItem);
  renderCart();
}

function renderCart() {
  cartTable.innerHTML = "";
  emptyCart.map((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("cart-body-item");
    const cardContent = `
        <div class="img-cart-col">
          <img src=${item.img} alt="Image">
        </div>

        <div class="info-cart-col">
          <h3 class="item-cart-title">${item.title}</h3>
          <span class="item-cart-price">${item.price}</span>

          <div class="options-cart-container">
            <input class="item-quantity-cart" type="number" min="1" value=${item.quantity}>
            <i class="ri-delete-bin-6-line item-button-delete"></i>
          </div>
        </div>
    `;
    itemCard.innerHTML = cardContent;
    cartTable.append(itemCard);

    bagLength.innerHTML = emptyCart.length


    itemCard
      .querySelector(".item-button-delete")
      .addEventListener("click", removeCartItem);

    itemCard
      .querySelector(".item-quantity-cart")
      .addEventListener("change", sumQuantity);
  });

  cartTotalPrice();
}

function cartTotalPrice() {
  let total = 0;
  const itemsTotalPrice = document.querySelector(".cart-total-price");
  emptyCart.forEach((item) => {
    const price = Number(item.price.replace("$", ""));
    total = total + price * item.quantity;
  });

  itemsTotalPrice.innerHTML = `Total $${total}`;
}

function removeCartItem(e) {
  const deleteButton = e.target;
  const itemCard = deleteButton.closest(".cart-body-item");
  const title = itemCard.querySelector(".item-cart-title").textContent;

  for (let i = 0; i < emptyCart.length; i++) {
    if (emptyCart[i].title.trim() === title.trim()) {
      emptyCart.splice(i, 1);
    }
  }

  itemCard.remove();
  cartTotalPrice();
  bagLength.innerHTML = emptyCart.length

}

const buyButton = document.querySelector(".cart-buy-item");

buyButton.addEventListener("click", () => {
  if (emptyCart.length >= 1) {
    Swal.fire(
      "Your purchase has been made",
      "In a few days it will reach your home",
      "success"
    );

    resetCart();
  } else if (emptyCart.length <= 1) {
    Swal.fire("There are no items to buy");
  }
});

function sumQuantity(e) {
  const sumInput = e.target;
  const itemCard = sumInput.closest(".cart-body-item");
  const title = itemCard.querySelector(".item-cart-title").textContent;

  emptyCart.forEach((item) => {
    if (item.title.trim() === title) {
      sumInput.value < 1 ? (sumInput.value = 1) : sumInput.value;
      item.quantity = sumInput.value;
      cartTotalPrice();
    }
  });
}

function resetCart() {
  const cartBody = document.querySelector(".cart-body");
  const cards = cartBody.querySelectorAll(".cart-body-item");

  for (let i = 0; i < cards.length; i++) {
    const singleCard = cards[i];

    singleCard.remove();
  }

  emptyCart = [];
  cartTotalPrice();
}

const soonItems = document.querySelector('.recently-button')

soonItems.addEventListener('click', ()=> {
  Swal.fire('Coming Soon')
})