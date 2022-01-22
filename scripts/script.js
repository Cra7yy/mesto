let popupCross = document.querySelector('.pop-up__cross') //кнопка выхода из popup
let popup = document.querySelector('.pop-up') // popup
let profileEditor = document.querySelector('.profile__editor') // кнопка вызова popup
let popupInputName = document.querySelector('.pop-up__input_name') // Редактируемое имя в popup
let popupInputSign = document.querySelector('.pop-up__input_sign') // Редактируемая подпись в popup
let form = document.querySelector('.pop-up__form') // форма в popup
let profileTitle = document.querySelector('.profile__title') // имя в profile__title
let profileSubtitle = document.querySelector('.profile__subtitle') //подпись в profile__subtitle

//функция переноса имени и подписи из profile  в popup
const transferTextContentPopup = () => {
  popupInputName.value = profileTitle.textContent
  popupInputSign.value = profileSubtitle.textContent
}
// функция переноса имени и подписи из profile  в popup по клику
profileEditor.addEventListener('click', transferTextContentPopup)

// функция добавляющая классу pop-up класс popup_opened
const popupOpen = () => {
  popup.classList.add('pop-up_opened')
}

// функция добавляющая классу pop-up класс popup_opened по клику
profileEditor.addEventListener('click', popupOpen)

// функция удаляющая класс popup_opened из pop-up
const close = () => {
  popup.classList.remove('pop-up_opened')
}

// удаляем класс popup_opened из popup по клику
popupCross.addEventListener('click', close)

// функция переносящая все изменения из pop-up  в profile
const transferTextContentProfile = () => {
  profileTitle.textContent = popupInputName.value
  profileSubtitle.textContent = popupInputSign.value
}

// функция сохраняющая все изменения сделанные в pop-up
form.addEventListener('submit', (event) => {
  event.preventDefault()
  transferTextContentProfile()
  close()
})
