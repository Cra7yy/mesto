export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._handleEscKeyClosedPopup = this._handleEscKeyClosedPopup.bind(this)
    this._clickOverlayClosedPopup = this._clickOverlayClosedPopup.bind(this)
  }

  _handleEscKeyClosedPopup(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _clickOverlayClosedPopup(event) {
    if (event.target.classList.contains('popup')) {
      this.close()
    }
  }

  addEventListeners() {
    this._popup.querySelector('.popup__cross').addEventListener('click', this.close.bind(this))
    this._popup.addEventListener('click', this._clickOverlayClosedPopup)
  }

  open() {
    document.addEventListener('keydown', this._handleEscKeyClosedPopup)
    this.addEventListeners()
    this._popup.classList.add('popup_opened')
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscKeyClosedPopup)
  }
}
