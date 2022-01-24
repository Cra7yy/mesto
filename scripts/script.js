let popupCross = document.querySelector('.pop-up__cross')
let popup = document.querySelector('.pop-up')
let profileEditor = document.querySelector('.profile__editor')
let popupInputValueName = document.querySelector('.pop-up__input_value_name')
let popupInputValueSign = document.querySelector('.pop-up__input_value_sign')
let form = document.querySelector('.pop-up__form')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

const transferTextContentPopup = () => {
  popupInputValueName.value = profileTitle.textContent
  popupInputValueSign.value = profileSubtitle.textContent
}
profileEditor.addEventListener('click', transferTextContentPopup)

const popupOpen = () => {
  popup.classList.add('pop-up_opened')
}

profileEditor.addEventListener('click', popupOpen)

const close = () => {
  popup.classList.remove('pop-up_opened')
}

popupCross.addEventListener('click', close)

const transferTextContentProfile = () => {
  profileTitle.textContent = popupInputValueName.value
  profileSubtitle.textContent = popupInputValueSign.value
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  transferTextContentProfile()
  close()
})
