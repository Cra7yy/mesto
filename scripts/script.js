let popupCross = document.querySelector('.pop-up__cross') //кнопка выхода из popup
let popup = document.querySelector('.pop-up') // popup
let profileEditor = document.querySelector('.profile__editor') // кнопка вызова popup
let popupName = document.querySelector('.pop-up__name') // Редактируемое имя в popup
let popupSign = document.querySelector('.pop-up__sign') // Редактируемая подпись в popup
let popupSubmit = document.querySelector('.pop-up__submit') // кнопка сохранения в popup
let profileTitle = document.querySelector('.profile__title') // имя в profile__title
let profileSubtitle = document.querySelector('.profile__subtitle') //подпись в profile__subtitle
let gridElementLikes = document.querySelectorAll('.grid-element__like') // иконка сердечка

//Перенос имени и подписи из profile  в popup
popupName.value = profileTitle.textContent
popupSign.value = profileSubtitle.textContent

// функция добавляющая классу pop-up класс popup_open по клику
profileEditor.addEventListener('click', () => {
  popup.classList.add('pop-up_opened')
})

// функция удаляющая класс popup_open из pop-up
const close = () => {
  popup.classList.remove('pop-up_opened')
}

// удаляем класс popup_opened из popup по клику
popupCross.addEventListener('click', close)

// функция сохраняющая все изменения сделанные в pop-up
popupSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  profileTitle.textContent = popupName.value
  profileSubtitle.textContent = popupSign.value
  close()
})

// переключения вида сердечка с не активного в активное состояние и обратно
gridElementLikes.forEach((like) => {
  like.addEventListener('click', () => {
    like.classList.toggle('far')
    like.classList.toggle('fas')
  })
})