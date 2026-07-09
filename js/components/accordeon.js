const accordeonBtns = document.querySelectorAll(".accordion__btn");

accordeonBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleAccordion(btn);
  });
});

const toggleAccordion = (btn) => {
  const activeBtn = document.querySelector(".accordion__btn--active");

  if (btn === activeBtn) {
    btn.classList.remove("accordion__btn--active");
    return;
  }

  if (activeBtn) {
    activeBtn.classList.remove("accordion__btn--active");
  }

  btn.classList.add("accordion__btn--active");
};
