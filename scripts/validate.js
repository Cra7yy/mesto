const showInputError = (popupForm, el, errorMessage, value) => {
  const errorElement = popupForm.querySelector(`.${el.id}-error`)

  el.classList.add(value.popupInputTypeError)
  errorElement.textContent = errorMessage
  errorElement.classList.add(value.popupInputErrorAction)
};

const hidenInputError = (popupForm, el, value) => {
  const errorElement = popupForm.querySelector(`.${el.id}-error`)

  el.classList.remove(value.popupInputTypeError)
  errorElement.classList.remove(value.popupInputErrorAction)
  errorElement.textContent = ''
}

const isValid = (popupForm, popupInput, value) => {
  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, value)
  } else {
    hidenInputError(popupForm, popupInput, value)
  }
}

const setEventListeners = (popupForm, value) => {
  const inputList = Array.from(popupForm.querySelectorAll(value.popupInput))
  const buttonElement = popupForm.querySelector(value.popupSubmit)

  toggleButttonState(inputList, buttonElement, value)

  inputList.forEach((el) => {
    isValid(popupForm, el, value)
    el.addEventListener('input', () => {
      isValid(popupForm, el, value)
      toggleButttonState(inputList, buttonElement, value)
    })
  })
}

const enableValidation = (value) => {
  const formList = Array.from(document.querySelectorAll(value.popupForm))

  formList.forEach((el) => {
    setEventListeners(el,value)
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((el) => {
    return !el.validity.valid
  })
}

const toggleButttonState = (inputList, buttonElement, value) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(value.popupSubmitAction)
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove(value.popupSubmitAction)
    buttonElement.removeAttribute('disabled')
  }
}
const repeatСheck = () => {
  enableValidation({
    popupSubmitAction: 'popup__submit_action',
    popupForm: '.popup__form',
    popupSubmit: '.popup__submit',
    popupInput: '.popup__input',
    popupInputErrorAction: 'popup__input-error_action',
    popupInputTypeError: 'popup__input_type_error'
  })
}

repeatСheck()
