import { toggle } from "../../composables/useToggle.js";

// ДЛЯ КНОПКИ КАТАЛОГА
const catalogBtn = document.querySelector(".header__catalog-btn");
const mainMenu = document.querySelector(".main-menu");
const closeBtn = document.querySelector(".main-menu__close");

const toggleMainMenu = () => {
  if (mainMenu) toggle(mainMenu, "main-menu--active");
};

catalogBtn.addEventListener("click", () => toggleMainMenu());
closeBtn.addEventListener("click", () => toggleMainMenu());

// ДЛЯ ВЫБОРКИ ГОРОДА
const cityBtn = document.querySelector(".location__city");
const cityName = document.querySelector(".location__city-name");
const cities = document.querySelectorAll(".location__sublink");

cityBtn.addEventListener("click", () =>
  toggle(cityBtn, "location__city--active"),
);

const toggleCity = () => {
  if (cityBtn) toggle(cityBtn, "location__city--active");
};

cities.forEach((city) => {
  city.addEventListener("click", (event) => {
    if (cityName) {
      cityName.textContent = event.target.innerText;
    }
    toggleCity();
  });
});

// ТУТ КОРЗИНА

const basketBtn = document.querySelector(".header__user-btn");
const basketMenu = document.querySelector(".basket");

basketBtn.addEventListener("click", () => toggleBasket());

const toggleBasket = () => {
  if (basketMenu) toggle(basketMenu, "basket--active");
};
