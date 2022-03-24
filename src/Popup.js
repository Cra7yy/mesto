import {
  popups,
  popupCrosses
} from './index.js'

export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector)
    this._keydownClosedPopup = this._keydownClosedPopup.bind(this)
  }

  _keydownClosedPopup(event) {
    if (event.key === 'Escape') {
      this.closePopup()
    }
  }

  _overlayClosedPopup = (event) => {
    if (event.target.classList.contains('popup_opened')) {
      this.closePopup()
    }
  }

  _clickOverlayClosedPopup() {
    popups.forEach((el) => {
      el.addEventListener('click', this._overlayClosedPopup)
    })
  }

  _clickCrossPopupClosed() {
    popupCrosses.forEach((el) => {
      el.addEventListener('click', () => {
        this.closePopup()
      })
    })
  }

  addEventListeners() {
    this._clickOverlayClosedPopup()
    this._clickCrossPopupClosed()
  }

  openPopup() {
    document.addEventListener('keydown', this._keydownClosedPopup)
    this._selector.classList.add('popup_opened')
  }

  closePopup() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._keydownClosedPopup)
  }
}
