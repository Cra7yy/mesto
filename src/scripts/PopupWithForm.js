import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({
    popupSubmitForm
  }, selector) {
    super(selector)
    this._popupSubmitForm = popupSubmitForm
    this._popupForm = this._selector.querySelector('.popup__form')
    this._savePopupForm = this._savePopupForm.bind(this)
  }

  _getInputMestoValues() {
    const newCard = {
      name: this._popupForm.querySelector('.popup__input_value_mesto').value,
      link: this._popupForm.querySelector('.popup__input_value_src').value
    }
    return newCard
  }

  _getInputProfileValues() {
    const newCard = {
      name: this._popupForm.querySelector('.popup__input_value_name').value,
      sign: this._popupForm.querySelector('.popup__input_value_sign').value
    }
    return newCard
  }

  _savePopupForm(event) {
    event.preventDefault()
    this._popupSubmitForm(this._inputСheck())
    this._popupForm.reset()
    super.closePopup(event)
  }

  _inputСheck() {
    if (this._popupForm.classList[1] == 'popup__form_type_profile') {
      return this._getInputProfileValues()
    } else {
      return this._getInputMestoValues()
    }
  }

  addEventListeners() {
    this._popupForm.addEventListener('submit', this._savePopupForm)
    super.addEventListeners()
  }

  openPopup() {
    super.openPopup()
  }

  closePopup() {
    super.closePopup()
  }
}
