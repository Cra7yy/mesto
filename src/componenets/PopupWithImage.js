import Popup from './Popup.js'

export default class PopupWisthImage extends Popup {
  constructor(selector) {
    super(selector)
    this._popupImageSrc = this._popup.querySelector('.popup-image__src')
    this._popupImageName = this._popup.querySelector('.popup-image__name')
  }

  open(card) {
    this._popupImageSrc.src = card.link
    this._popupImageSrc.alt = card.name
    this._popupImageName.textContent = card.name

    super.open()
  }
}
