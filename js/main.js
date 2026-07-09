import "./components/header/header.js";
import { useLuminaireStore } from "./stores/useLuminaireStore.js";
import { useCardRender } from "./composables/useCardRender.js";
import { countLuminaires } from "./composables/useCountLuminaires.js";
import { useBasket } from "./composables/useBasket.js";
import "./components/accordeon.js";
import { useSwiper } from "./components/slider.js";
import { useValidate } from "./components/validate.js";
import { usePagination } from "./composables/usePagination.js";

const lumStore = useLuminaireStore();
const cardRender = useCardRender();
const pagination = usePagination();
const basket = useBasket();

window.addEventListener("DOMContentLoaded", async () => {
  await lumStore.getLuminaires();

  useValidate.validate();

  if (lumStore.luminaires.length > 0) {
    cardRender.render(lumStore.luminaires);

    pagination.renderPagination(lumStore.pagesCount);
  }

  const goodsOfDayCards = lumStore.luminaires.filter((card) => card.goodsOfDay);

  if (goodsOfDayCards.length > 0) {
    cardRender.dayCardsRender(goodsOfDayCards);

    useSwiper.swiper();
  }

  countLuminaires(lumStore.luminaires);

  lumStore.filterLuminares();

  basket.renderBasket();
});
