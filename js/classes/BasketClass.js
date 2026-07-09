import { useBasket } from "../composables/useBasket.js";

export default class BasketClass {
  constructor() {}

  static getCard(cardData) {
    const basket = useBasket();
    const li = document.createElement("li");

    li.className = "basket__item";
    li.dataset.id = cardData.id;

    li.innerHTML = `<div class="basket__img">
                  <img src="${cardData.image}" alt="Фотография товара" height="60" width="60">
                </div>
                <span class="basket__name">${cardData.name}</span>
                <span class="basket__price">${cardData.price.new} руб</span>
                <button class="basket__item-close" type="button">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
                </button>`;

    const removeBtn = li.querySelector(".basket__item-close");

    removeBtn.addEventListener("click", () =>
      basket.removeFromBasket(cardData.id),
    );

    return li;
  }
}
