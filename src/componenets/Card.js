export default class Card {
  constructor({
    item,
    open
  }, selector) {
    this.data = item
    this._name = item.name
    this._link = item.link
    this._open = open
    this._selector = selector
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.grid-element').cloneNode(true)
    return cardElement
  }

  createCard() {
    this._element = this._getElement()
    const img = this._element.querySelector('.grid-element__img')

    this._element.querySelector('.grid-element__title').textContent = this._name
    img.src = this._link
    img.alt = this._name

    this._addEventListeners()
    return this._element
  }

  _addEventListeners() {
    this._element.querySelector('.grid-element__like').addEventListener('click', this._clickLike)
    this._element.querySelector('.grid-element__remove').addEventListener('click', () => this._clickRemove())
    this._element.querySelector('.grid-element__img').addEventListener('click', () => this._open())
  }

  _clickRemove() {
    this._element.remove()
  }

  _clickLike(event) {
    event.target.classList.toggle('grid-element__like_action')
  }
}
