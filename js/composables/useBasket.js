import BasketClass from "../classes/BasketClass.js";
import StorageClass from "../classes/StorageClass.js";

export const useBasket = () => {
  const renderBasket = () => {
    const count = document.querySelector(".header__user-count");
    const basketList = document.querySelector(".basket__list");
    const emptyBlock = document.querySelector(".basket__empty-block");

    if (!basketList) return;

    const items = StorageClass.get("basketItems") || [];

    if (emptyBlock) {
      emptyBlock.style.display = items.length === 0 ? "block" : "none";
    }

    basketList.innerHTML = "";

    // if (items.length === 0) return;

    items.forEach((item) => {
      const cardNode = BasketClass.getCard(item);
      basketList.append(cardNode);
    });

    count.textContent = items.length;
  };

  const addToBasket = (cardData) => {
    const basket = StorageClass.get("basketItems") || [];
    const isItemExists = basket.find((item) => item.id === cardData.id);

    if (isItemExists) return;

    StorageClass.add("basketItems", cardData);

    renderBasket();
  };

  const removeFromBasket = (cardId) => {
    const items = StorageClass.get("basketItems") || [];
    const filteredItems = items.filter((item) => item.id !== cardId);

    localStorage.setItem("basketItems", JSON.stringify(filteredItems));

    renderBasket();
  };

  return { addToBasket, removeFromBasket, renderBasket };
};
