export default class FormValidator {
  constructor(selector, form) {
    this._popupForm = document.querySelector(form)
    this._popupSubmitAction = selector.popupSubmitAction
    this._popupSubmit = selector.popupSubmit
    this._popupInput = selector.popupInput
    this._popupInputErrorAction = selector.popupInputErrorAction
    this._popupInputTypeError = selector.popupInputTypeError
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._popupInput))
    this._buttonElement = this._popupForm.querySelector(this._popupSubmit)
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

  resetError() {
    this._inputList.forEach(el => {
      this._hidenInputError(el)
    })
  }

  _isValid(el) {
    if (!el.validity.valid) {
      this._showInputError(el, el.validationMessage)
    } else {
      this._hidenInputError(el)
    }
  }

  _setEventListeners() {
    this.disabledButttonState()

    this._inputList.forEach((el) => {
      el.addEventListener('input', () => {
        this._isValid(el)
        this._toggleButttonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }

  _hasInvalidInput() {
    return this._inputList.some((el) => {
      return !el.validity.valid
    })
  }

  _toggleButttonState() {
    this._hasInvalidInput() ?
      this.disabledButttonState() :
      this.actionButttonState()
  }

  disabledButttonState() {
    this._buttonElement.classList.add(this._popupSubmitAction)
    this._buttonElement.setAttribute('disabled', true)
  }

  actionButttonState() {
    this._buttonElement.classList.remove(this._popupSubmitAction)
    this._buttonElement.removeAttribute('disabled')
  }

}
