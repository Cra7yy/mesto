import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({
    handleSubmit
  }, selector) {
    super(selector)
    this._handleSubmit = handleSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
    this._savePopupForm = this._savePopupForm.bind(this)
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _savePopupForm(event) {
    event.preventDefault()
    this._handleSubmit(this._getInputValues())
    this.close()
  }
  
  addEventListeners() {
    this._popupForm.addEventListener('submit', this._savePopupForm)
    super.addEventListeners()
  }

  close() {
    this._popupForm.reset()
    super.close()
  }
}
