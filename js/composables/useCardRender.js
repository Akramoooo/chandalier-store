import LuminaireClass from "../classes/LuminaireClass.js";

export const useCardRender = () => {
  const render = (cards) => {
    const list = document.querySelector(".catalog__list");
    if (!list) return;

    list.innerHTML = "";

    cards.forEach((card) => {
      const cardNode = LuminaireClass.getCard(card);

      list.append(cardNode);
    });
  };

  const dayCardsRender = (cards) => {
    const list = document.querySelector(".day-products__list");
    list.innerHTML = "";

    cards.forEach((card) => {
      const node = LuminaireClass.getDayCard(card);
      list.append(node);
    });
  };

  return { render, dayCardsRender };
};
