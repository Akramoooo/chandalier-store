import { useCardRender } from "../composables/useCardRender.js";
import { usePagination } from "../composables/usePagination.js";

export const useLuminaireStore = () => {
  const cardRender = useCardRender();
  const { renderPagination } = usePagination();

  const luminaires = [];
  const itemsPerPage = 6;
  let currentPage = 1;
  let currentFilteredCards = [];

  const selectedFilters = [];

  let currentStatus = "all-item";
  let currentSort = "default";

  const renderCurrentPage = (page) => {
    currentPage = page;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = currentFilteredCards.slice(start, end);
    cardRender.render(pageItems);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLuminaires = async () => {
    try {
      const response = await fetch("./data/data.json");
      if (!response.ok) throw new Error("Ошибка");
      const data = await response.json();
      luminaires.length = 0;
      luminaires.push(...data);

      filter();
    } catch (error) {
      console.log(error);
    }
  };

  const filterLuminares = () => {
    const filterItems = document.querySelectorAll(
      ".catalog-form__item-col input",
    );
    filterItems.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedFilters.push(checkbox.value);
        } else {
          const index = selectedFilters.indexOf(checkbox.value);
          if (index > -1) selectedFilters.splice(index, 1);
        }
        filter();
      });
    });

    const statusRadios = document.querySelectorAll('input[name="status"]');
    statusRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        currentStatus = radio.value;
        filter();
      });
    });

    const sortSelect = document.querySelector(".catalog__sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        setSort(event.target.value);
      });
    }
  };

  const setSort = (sortValue) => {
    currentSort = sortValue;
    filter();
  };

  const filter = () => {
    currentFilteredCards = luminaires.filter((lum) => {
      const itemTypes = Array.isArray(lum.type) ? lum.type : [lum.type];
      const matchesType =
        selectedFilters.length === 0 ||
        itemTypes.some((t) => selectedFilters.includes(t));

      let matchesStatus = true;
      if (currentStatus === "instock") {
        matchesStatus = Object.values(lum.availability).some(
          (count) => count > 0,
        );
      }
      return matchesType && matchesStatus;
    });

    if (currentSort === "price-min") {
      currentFilteredCards.sort((a, b) => a.price.new - b.price.new);
    } else if (currentSort === "price-max") {
      currentFilteredCards.sort((a, b) => b.price.new - a.price.new);
    }

    const pagesCount = Math.ceil(currentFilteredCards.length / itemsPerPage);

    renderPagination(pagesCount, (page) => renderCurrentPage(page));

    renderCurrentPage(1);
  };

  return {
    luminaires,
    getLuminaires,
    filterLuminares,
    setSort,
  };
};
