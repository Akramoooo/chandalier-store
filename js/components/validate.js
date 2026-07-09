export const useValidate = {
  validate: () => {
    const formElement = document.querySelector(".questions__form");
    if (!formElement) return;

    const validator = new JustValidate(".questions__form");
    const modal = document.querySelector("#modal");
    const modalText = document.querySelector("#modal-text");
    const modalClose = document.querySelector("#modal-close");

    const showModal = (text, isError = false) => {
      if (!modal || !modalText) {
        alert(text);
        return;
      }
      modalText.textContent = text;
      modalText.style.color = isError ? "#d9534f" : "#5cb85c";
      modal.classList.add("modal--open");
    };

    if (modalClose) {
      modalClose.addEventListener("click", () =>
        modal.classList.remove("modal--open"),
      );
    }

    validator
      .addField("#name", [
        { rule: "required", errorMessage: "Введите имя" },
        { rule: "minLength", value: 3 },
        { rule: "maxLength", value: 20 },
      ])
      .addField("#email", [
        { rule: "required", errorMessage: "Введите email" },
        { rule: "email", errorMessage: "Ошибка в почте" },
      ])
      .addField("#agree", [
        { rule: "required", errorMessage: "Нужно согласие" },
      ])
      .onSuccess(async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        try {
          const response = await fetch("https://httpbin.org/post", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            showModal("Благодарим за обращение!");
            form.reset();
            validator.refresh();
          } else {
            showModal("Ошибка сервера. Попробуйте позже.", true);
          }
        } catch (error) {
          showModal("Не удалось отправить форму. Проверьте интернет.", true);
        }
      });
  },
};
