export default class FormValidator {
  constructor(selector, form) {
    this._popupForm = form
    this._popupSubmitAction = selector.popupSubmitAction
    this._popupSubmit = selector.popupSubmit
    this._popupInput = selector.popupInput
    this._popupInputErrorAction = selector.popupInputErrorAction
    this._popupInputTypeError = selector.popupInputTypeError
  }

  _showInputError(el, errorMessage) {
    const errorElement = this._popupForm.querySelector(`.${el.id}-error`)

    el.classList.add(this._popupInputTypeError)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._popupInputErrorAction)
  }

  _hidenInputError(el) {
    const errorElement = this._popupForm.querySelector(`.${el.id}-error`)

    el.classList.remove(this._popupInputTypeError)
    errorElement.classList.remove(this._popupInputErrorAction)
    errorElement.textContent = ''
  }

  _isValid(el) {
    console.log(el.errorMessage)
    if (!el.validity.valid) {
      this._showInputError(el, el.validationMessage)
    } else {
      this._hidenInputError(el)
    }
  }

  _setEventListeners() {
    this._buttonElement = this._popupForm.querySelector(this._popupSubmit)

    this._toggleButttonState(this._buttonElement)

    this._inputList.forEach((el) => {
      el.addEventListener('input', () => {
        this._isValid(el)
        this._toggleButttonState(this._buttonElement)
      })
    })
  }

  enableValidation() {
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._popupInput))

    this._setEventListeners()
    return this._inputList
  }

  _hasInvalidInput() {
    return this._inputList.some((el) => {
      return !el.validity.valid
    })
  }

  _toggleButttonState(buttonElement) {
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._popupSubmitAction)
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._popupSubmitAction)
      buttonElement.removeAttribute('disabled')
    }
  }
}
