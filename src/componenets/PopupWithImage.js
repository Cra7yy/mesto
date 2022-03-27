import Popup from './Popup.js'

export default class PopupWisthImage extends Popup {
  constructor(card, selector) {
    super(selector)
    this._card = card
    this._popupImageSrc = this._popup.querySelector('.popup-image__src')
    this._popupImageName = this._popup.querySelector('.popup-image__name')
  }

  open() {
    this._popupImageSrc.src = this._card.link
    this._popupImageSrc.alt = this._card.name
    this._popupImageName.textContent = this._card.name

    super.open()
  }
}
