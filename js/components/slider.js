export const useSwiper = {
  swiper: () => {
    return new Swiper(".day-products__slider", {
      slidesPerView: 4,
      spaceBetween: 40,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      navigation: {
        nextEl: ".day-products__navigation-btn--next",
        prevEl: ".day-products__navigation-btn--prev",
      },
    });
  },
};
