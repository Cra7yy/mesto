import {openPopup, popupTypeImage, popupImageSrc, popupImageName} from './script.js'

export default class Card {
  constructor(data, selector) {
    this.data = data
    this._name = data.name
    this._link = data.link
    this._selector = selector
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.grid-element').cloneNode(true)

    return cardElement
  }

  _createCard() {
    this._element = this._getElement()
    const img = this._element.querySelector('.grid-element__img')

    this._element.querySelector('.grid-element__title').textContent = this._name
    img.src = this._link
    img.alt = this._name

    this.addEventListeners()
    return this._element
  }

  addEventListeners() {
    this._element.querySelector('.grid-element__like').addEventListener('click', this._clickLike)
    this._element.querySelector('.grid-element__remove').addEventListener('click', () => this._clickRemove())
    this._element.querySelector('.grid-element__img').addEventListener('click', () => this._openPopupImage(this.data))
  }

  _clickRemove() {
    this._element.remove()
  }

  _clickLike(event) {
    event.target.classList.toggle('grid-element__like_action')
  }

  _openPopupImage(card) {
    popupImageSrc.src = card.link
    popupImageSrc.alt = card.name
    popupImageName.textContent = card.name

    openPopup(popupTypeImage)
  }
}


