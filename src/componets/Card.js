export default class Card {
  constructor({
    item,
    open
  }, selector, handleDeleteClick, handleLikeClick) {
    this.data = item
    this._name = item.name
    this._link = item.link
    this._likes = item.likes
    this._id = item.id
    this._userId = item.userId
    this._ownerId = item.ownerId

    this._open = open
    this._selector = selector
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    return userHasLikedCard
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.grid-element').cloneNode(true)
    return cardElement
  }

  setLikes(newLikes) {
    this._likes = newLikes
    const likeCountElement = this._element.querySelector('.grid-element__span-like')
    likeCountElement.textContent = this._likes.length

    if (this.isLiked()) {
      this._fillLike()
    } else {
      this._removeLike()
    }
  }

  createCard() {
    this._element = this._getElement()
    const img = this._element.querySelector('.grid-element__img')

    this._element.querySelector('.grid-element__title').textContent = this._name
    img.src = this._link
    img.alt = this._name

    this.setLikes(this._likes)
    this._addEventListeners()

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.grid-element__remove').style.display = 'none'
    }

    return this._element
  }

  _addEventListeners() {
    this._element.querySelector('.grid-element__like').addEventListener('click', () => {
      this._handleLikeClick(this._id)
    })
    this._element.querySelector('.grid-element__remove').addEventListener('click', () => {
      this._handleDeleteClick(this._id)
    })
    this._element.querySelector('.grid-element__img').addEventListener('click', () => this._open())
  }

  clickRemove() {
    this._element.remove()
  }

  _fillLike() {
    this._element.querySelector('.grid-element__like').classList.add('grid-element__like_action')
  }

  _removeLike() {
    this._element.querySelector('.grid-element__like').classList.remove('grid-element__like_action')
  }
}
