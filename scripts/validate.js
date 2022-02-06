const showInputError = (popupForm, el, errorMessage) => {
  const errorElement = popupForm.querySelector(`.${el.id}-error`)

  el.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_action')
};

const hidenInputError = (popupForm, el) => {
  const errorElement = popupForm.querySelector(`.${el.id}-error`)

  el.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error_action')
  errorElement.textContent = ''
}

const isValid = (popupForm, popupInput) => {
  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage)
  } else {
    hidenInputError(popupForm, popupInput)
  }
}

const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll('.popup__input'))
  const buttonElement = popupForm.querySelector('.popup__submit')

  toggleButttonState(inputList, buttonElement)

  inputList.forEach((el) => {
    el.addEventListener('input', () => {
      isValid(popupForm, el)
      toggleButttonState(inputList, buttonElement)
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach((el) => {
    el.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    setEventListeners(el)
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((el) => {
    return !el.validity.valid
  })
}

const toggleButttonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_action')
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove('popup__submit_action')
    buttonElement.removeAttribute('disabled')
  }
}
