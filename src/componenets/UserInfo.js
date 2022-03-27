export default class UserInfo {
  constructor({
    profileTitle,
    profileSubtitle,
  }) {
    this._profileTitle = document.querySelector(profileTitle)
    this._profileSubtitle = document.querySelector(profileSubtitle)
  }

  getUserInfo() {
    const userInfo = {}

    userInfo.name = this._profileTitle.textContent
    userInfo.sign = this._profileSubtitle.textContent

    return userInfo
  }

  setUserInfo(value) {
    this._profileTitle.textContent = value.name
    this._profileSubtitle.textContent = value.sign
  }
}
