import Popup from './Popup.js'

export default class PopupWisthImage extends Popup {
  constructor(card, selector) {
    super(selector)
    this._card = card
  }

  openPopupImage() {
    const popupImageSrc = document.querySelector('.popup-image__src')
    const popupImageName = document.querySelector('.popup-image__name')

    popupImageSrc.src = this._card.link
    popupImageSrc.alt = this._card.name
    popupImageName.textContent = this._card.name

    super.openPopup()
  }
}
