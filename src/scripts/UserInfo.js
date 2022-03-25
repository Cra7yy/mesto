export default class UserInfo {
  constructor({
    profileTitle,
    profileSubtitle,
    popupInputValueName,
    popupInputValueSign
  }) {
    this._profileTitle = document.querySelector(profileTitle)
    this._profileSubtitle = document.querySelector(profileSubtitle)
    this._popupInputValueName = document.querySelector(popupInputValueName)
    this._popupInputValueSign = document.querySelector(popupInputValueSign)
  }

  transferTextContentPopup() {
    this._popupInputValueName.value = this._profileTitle.textContent
    this._popupInputValueSign.value = this._profileSubtitle.textContent
  }

  transferTextContentProfile(value) {
    this._profileTitle.textContent = value.name
    this._profileSubtitle.textContent = value.sign
  }
}
