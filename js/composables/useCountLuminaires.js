export const countLuminaires = (luminaires) => {
  const counts = luminaires.reduce((acc, lum) => {
    const types = Array.isArray(lum.type) ? lum.type : [lum.type];

    types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });

    return acc;
  }, {});

  const filterItems = document.querySelectorAll(".catalog-form__item-col");

  filterItems.forEach((item) => {
    const checkbox = item.querySelector("input");
    const countDisplay = item.querySelector(".custom-checkbox__count");

    if (checkbox && countDisplay) {
      const filterValue = checkbox.value;
      const totalCount = counts[filterValue] || 0;

      countDisplay.textContent = totalCount;
    }
  });

  return filterItems;
};
