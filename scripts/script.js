import Card from './Card.js'
import FormValidator from './FormValidator.js';

const initialCards = [{
    name: 'Золотые Ворота',
    link: 'https://images.unsplash.com/photo-1643142032527-59075c185fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Зима в Навозово',
    link: 'https://images.unsplash.com/photo-1643118156795-260d71d95756?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80'
  },
  {
    name: 'Лесная тропинка',
    link: 'https://images.unsplash.com/photo-1643150237275-a6b7c0b7f360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80'
  },
  {
    name: 'Метро в Петрозаводске',
    link: 'https://images.unsplash.com/photo-1643123645046-05f9800654b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Мезоберзан',
    link: 'https://images.unsplash.com/photo-1643106028119-0c116ac7d262?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1512&q=80'
  },
  {
    name: 'Драконье озеро',
    link: 'https://images.unsplash.com/photo-1643126157241-99a67bc10f9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Заоблочные вершины',
    link: 'https://images.unsplash.com/photo-1643028253185-ee7955a97a92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Асфальтированая дорога',
    link: 'https://images.unsplash.com/photo-1642975478121-56c773efbca5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Голубая логуна',
    link: 'https://images.unsplash.com/photo-1643266809211-8c65ed4a92c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
  }
];

const select = {
  popupSubmitAction: 'popup__submit_action',
  popupSubmit: '.popup__submit',
  popupInput: '.popup__input',
  popupInputErrorAction: 'popup__input-error_action',
  popupInputTypeError: 'popup__input_type_error'
}

const profileEditor = document.querySelector('.profile__editor')
const profileMesto = document.querySelector('.profile__mesto')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const gridConteiner = document.querySelector('.grid-conteiner')

const popupTypeProfile = document.querySelector('.popup_type_profile')
const profileValidatorForm = new FormValidator(select, popupTypeProfile)
const popupFormTypeProfile = popupTypeProfile.querySelector('.popup__form_type_profile')
const popupInputValueName = popupTypeProfile.querySelector('.popup__input_value_name')
const popupInputValueSign = popupTypeProfile.querySelector('.popup__input_value_sign')
const nameInputError = document.querySelector('.name-input-error')
const signInputError = document.querySelector('.sign-input-error')

const popupTypeMesto = document.querySelector('.popup_type_mesto')
const mestoValidatorForm = new FormValidator(select, popupTypeMesto)
const popupFormTypeMesto = popupTypeMesto.querySelector('.popup__form_type_mesto')
const popupInputValueMesto = popupTypeMesto.querySelector('.popup__input_value_mesto')
const popupInputValueSrc = popupTypeMesto.querySelector('.popup__input_value_src')

const popupCrosses = document.querySelectorAll('.popup__cross')
const popups = document.querySelectorAll('.popup')

export const openPopup = (popup) => {
  document.addEventListener('keydown', keydownClosedPopup)
  popup.classList.add('popup_opened')
}

const clickCrossPopupClosed = () => {
  popupCrosses.forEach((el) => {
    el.addEventListener('click', () => {
      const popupOpened = el.closest('.popup_opened')
      closePopup(popupOpened)
    })
  })
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownClosedPopup)
}

const transferTextContentPopup = () => {
  popupInputValueName.value = profileTitle.textContent
  popupInputValueSign.value = profileSubtitle.textContent
}

const transferTextContentProfile = () => {
  profileTitle.textContent = popupInputValueName.value
  profileSubtitle.textContent = popupInputValueSign.value
}

const savePopupFormProfile = (event) => {
  event.preventDefault()
  transferTextContentProfile()
  closePopup(popupTypeProfile)
}

const clickOpenPopupProfile = () => {
  transferTextContentPopup()
  enableSubmitButton()
  disableProfileInputError()
  openPopup(popupTypeProfile)
}

const enableSubmitButton = () => {
  const button = document.querySelector('.popup__submit')
  button.classList.remove('popup__submit_action')
  button.removeAttribute('disabled')
}

const disableProfileInputError = () => {
  popupInputValueName.classList.remove('popup__input_type_error')
  nameInputError.classList.remove('popup__input-error_action')
  popupInputValueSign.classList.remove('popup__input_type_error')
  signInputError.classList.remove('popup__input-error_action')
}

const transferContentMesto = () => {
  const newCard = {
    name: popupInputValueMesto.value,
    link: popupInputValueSrc.value
  }

  additionCards(newCard)
}

const resetForm = () => {
  popupFormTypeMesto.reset()
}

const savePopupFormMesto = (event) => {
  event.preventDefault()
  transferContentMesto()
  resetForm()
  disableSubmitButton(event)
  closePopup(popupTypeMesto)
}

const disableSubmitButton = (event) => {
  const button = event.target.querySelector('.popup__submit')
  button.classList.add('popup__submit_action')
  button.setAttribute('disabled', true)
}

const clickOpenPopupMesto = () => {
  openPopup(popupTypeMesto)
}

const overlayClosedPopup = (event) => {
  const popupOpen = document.querySelector('.popup_opened')
  if (event.target.classList.contains('popup_opened')) {
    closePopup(popupOpen)
  }
}

const clickOverlayClosedPopup = () => {
  popups.forEach((el) => {
    el.addEventListener('click', overlayClosedPopup)
  })
}

const keydownClosedPopup = (event) => {
  if (event.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    closePopup(popupOpen)
  }
}

const additionCards = (item) => {
  const card = new Card(item, '#grid-content')
  const cardElement = card._createCard()
  gridConteiner.prepend(cardElement)
}

initialCards.forEach((item) => {
  additionCards(item)
})

clickOverlayClosedPopup()
popupFormTypeMesto.addEventListener('submit', savePopupFormMesto)
popupFormTypeProfile.addEventListener('submit', savePopupFormProfile)
clickCrossPopupClosed()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
profileValidatorForm.enableValidation()
mestoValidatorForm.enableValidation()

