export const toggle = (element, activeClass) => {
  if (!element) return;

  element.classList.toggle(activeClass);
};
