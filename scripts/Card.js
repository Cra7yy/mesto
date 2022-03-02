import {openPopup} from './script.js'

export default class Card {
  constructor(data, selector) {
    this.data = data
    this._name = data.name
    this._link = data.link
    this._selector = selector
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.cloneNode(true)

    return cardElement
  }

  _createCard() {
    this._element = this._getElement()

    this._element.querySelector('.grid-element__title').textContent = this._name
    this._element.querySelector('.grid-element__img').src = this._link
    this._element.querySelector('.grid-element__img').alt = this._name

    this.addEventListeners()
    return this._element
  }

  addEventListeners() {
    this._element.querySelector('.grid-element__like').addEventListener('click', this.clickLike)
    this._element.querySelector('.grid-element__remove').addEventListener('click', this.clickRemove)
    this._element.querySelector('.grid-element__img').addEventListener('click', () => this.openPopupImage(this.data))
  }

  clickRemove(event) {
    event.target.closest('.grid-element').remove()
  }

  clickLike(event) {
    event.target.classList.toggle('grid-element__like_action')
  }

  openPopupImage(card) {
    const popupTypeImage = document.querySelector('.popup_type_image')
    const popupImageSrc = popupTypeImage.querySelector('.popup-image__src')
    const popupImageName = popupTypeImage.querySelector('.popup-image__name')

    popupImageSrc.src = card.link
    popupImageSrc.alt = card.name
    popupImageName.textContent = card.name

    openPopup(popupTypeImage)
  }
}


