const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "input-error_active",
};

const showInputError = (form, input, config, errorMessage) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.classList.add(config.errorClass);
  console.log(formError);
  formError.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
};

const hideInputError = (form, input, config) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.classList.remove(config.errorClass);
  formError.textContent = "";
  input.classList.remove(config.inputErrorClass);
};

const isValid = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, config, input.validationMessage);
  } else {
    hideInputError(form, input, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
};

enableValidation(config);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
}

const resetValidation = (popup, config) => {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  const submitButton = popup.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    hideInputError(popup, input, config);
  });
  toggleButtonState(inputList, submitButton, config);
};
