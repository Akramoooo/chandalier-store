export const usePagination = () => {
  const renderPagination = (pagesCount, onPageChange) => {
    const list = document.querySelector(".catalog__pagination");
    if (!list || pagesCount <= 1) {
      if (list) list.innerHTML = "";
      return;
    }

    list.innerHTML = "";

    for (let index = 1; index <= pagesCount; index++) {
      const li = document.createElement("li");
      li.className = "catalog__pagination-item";

      const btn = document.createElement("button");
      btn.className = "catalog__pagination-link";
      btn.textContent = index;

      if (index === 1) btn.classList.add("catalog__pagination-link--active");

      btn.addEventListener("click", (e) => {
        // document.querySelectorAll(".catalog__pagination-link").forEach(el =>
        //   el.classList.remove("catalog__pagination-link--active")
        // );
        // btn.classList.add("catalog__pagination-link--active");

        onPageChange(index);
      });

      li.append(btn);
      list.append(li);
    }
  };

  return { renderPagination };
};
