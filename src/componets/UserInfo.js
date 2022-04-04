export default class UserInfo {
  constructor({
    profileTitle,
    profileSubtitle,
    profileImg
  }) {
    this._profileTitle = document.querySelector(profileTitle)
    this._profileSubtitle = document.querySelector(profileSubtitle)
    this._avatar = document.querySelector(profileImg)
  }

  getUserInfo() {
    const userInfo = {}

    userInfo.name = this._profileTitle.textContent
    userInfo.sign = this._profileSubtitle.textContent

    return userInfo
  }

  setUserInfo(value) {
    this._profileTitle.textContent = value.name
    this._profileSubtitle.textContent = value.about
    this._avatar.src = value.avatar
  }
}

