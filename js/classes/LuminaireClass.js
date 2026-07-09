import { useBasket } from "../composables/useBasket.js";

export default class LuminaireClass {
  constructor() {}

  static getCard(cardData) {
    return this.createLi("catalog__item", cardData, 436);
  }

  static getDayCard(cardData) {
    return this.createLi("day-products__item swiper-slide", cardData, 344);
  }

  static createLi(className, cardData, imgHeight) {
    const li = document.createElement("li");
    li.className = className;
    li.dataset.id = cardData.id;

    li.innerHTML = `
      <div class="product-card ${imgHeight < 400 ? "product-card--small" : ""}">
        ${this.renderVisual(cardData, imgHeight)}
        ${this.renderInfo(cardData)}
      </div>`;

    this.bindEvents(li, cardData);
    return li;
  }

  static renderVisual(cardData, imgHeight) {
    return `
      <div class="product-card__visual">
        <img class="product-card__img" src="${cardData.image}" height="${imgHeight}" width="290" alt="${cardData.name}" />
        <div class="product-card__more">
          <a href="#" class="product-card__link btn btn--icon">
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
          </a>
          <a href="#" class="product-card__link btn btn--secondary">
            <span class="btn__text">Подробнее</span>
          </a>
        </div>
      </div>`;
  }

  static renderInfo(cardData) {
    const oldPrice = cardData.price.old
      ? `<span class="product-card__old">${cardData.price.old} <span>₽</span></span>`
      : "";

    return `
      <div class="product-card__info">
        <h2 class="product-card__title">${cardData.name}</h2>
        ${oldPrice}
        <span class="product-card__price">${cardData.price.new} <span>₽</span></span>
        ${this.renderTooltipTemplate(cardData.availability)}
      </div>`;
  }

  static renderTooltipTemplate(availability) {
    const cities = [
      { key: "moscow", name: "Москва" },
      { key: "orenburg", name: "Оренбург" },
      { key: "saintPetersburg", name: "Санкт-Петербург" },
    ];

    const listItems = cities
      .map(
        (city) => `
        <li class="tooltip__item">
          <span class="tooltip__text">${city.name}: 
            <span class="tooltip__count">${availability[city.key] || 0}</span>
          </span>
        </li>`,
      )
      .join("");

    return `
      <div class="product-card__tooltip tooltip">
        <button class="tooltip__btn" aria-label="Показать подсказку">
          <svg class="tooltip__icon" width="5" height="10"><use xlink:href="images/sprite.svg#icon-i"></use></svg>
        </button>
        <div class="tooltip__content" style="display: none;">
          <div class="tooltip__content-inner">
            <span class="tooltip__text">Наличие товара по городам:</span>
            <ul class="tooltip__list">${listItems}</ul>
          </div>
        </div>
      </div>`;
  }

  static bindEvents(li, cardData) {
    this.initBasket(li, cardData);
    this.initTippy(li);
  }

  static initBasket(li, cardData) {
    const basket = useBasket();
    const btn = li.querySelector(".btn--icon");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      basket.addToBasket(cardData);
    });
  }

  static initTippy(li) {
    const btn = li.querySelector(".tooltip__btn");
    const content = li.querySelector(".tooltip__content");

    if (!btn || !content) return;

    tippy(btn, {
      content: content.innerHTML,
      allowHTML: true,
      interactive: true,
      placement: "top-end",
      arrow: false,
      offset: [0, 10],
    });

    content.remove();
  }
}
