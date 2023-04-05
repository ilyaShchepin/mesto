export class FormValidator {
  constructor (config, form) {
    this._config = config;
    this.form = form;
    this._inputList = Array.from(this.form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this.form.querySelector(this._config.submitButtonSelector);
  }


_showInputError (input)  {
  const formError = this.form.querySelector(`.${input.id}-error`);
  formError.classList.add(this._config.errorClass);
  formError.textContent = input.validationMessage;
  input.classList.add(this._config.inputErrorClass);
};

_hideInputError (input)   {
  const formError = this.form.querySelector(`.${input.id}-error`);
  formError.classList.remove(this._config.errorClass);
  formError.textContent = "";
  input.classList.remove(this._config.inputErrorClass);
};

_toggleInputErrorState  (input)  {
  if (!input.validity.valid) {
    this._showInputError(input);
  } else {
    this._hideInputError(input);
  }
};

_setEventListeners  ()  {
  
  this._inputList.forEach((input) => {
    input.addEventListener("input", () => {
      this._toggleInputErrorState(input);
      this._toggleButtonState();
    });
  });
};

enableValidation ()  {
    this._setEventListeners();
  };




_hasInvalidInput() {
  return this._inputList.some(() => {
    return !inputElement.validity.valid;
  });
}

_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  } else {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", "");
  }
}

resetValidation ()  {
  this._inputList.forEach((input) => {
    this._hideInputError(input);
  });
  this._toggleButtonState();
};
}