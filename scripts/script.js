import Card from './Card.js'
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js'

const validationConfig = {
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
const profileValidatorForm = new FormValidator(validationConfig, '.popup_type_profile')
const popupFormTypeProfile = document.querySelector('.popup__form_type_profile')
const popupInputValueName = document.querySelector('.popup__input_value_name')
const popupInputValueSign = document.querySelector('.popup__input_value_sign')

const popupTypeMesto = document.querySelector('.popup_type_mesto')
const mestoValidatorForm = new FormValidator(validationConfig, '.popup_type_mesto')
const popupFormTypeMesto = document.querySelector('.popup__form_type_mesto')
const popupInputValueMesto = document.querySelector('.popup__input_value_mesto')
const popupInputValueSrc = document.querySelector('.popup__input_value_src')

export const popupTypeImage = document.querySelector('.popup_type_image')
export const popupImageSrc = popupTypeImage.querySelector('.popup-image__src')
export const popupImageName = popupTypeImage.querySelector('.popup-image__name')
const popupCrosses = document.querySelectorAll('.popup__cross')
const popups = document.querySelectorAll('.popup')

export const openPopup = (popup) => {
  console.log(popup)
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
  profileValidatorForm.actionButttonState()
  profileValidatorForm.resetError()
  openPopup(popupTypeProfile)
}

const transferContentMesto = () => {
  const newCard = {
    name: popupInputValueMesto.value,
    link: popupInputValueSrc.value
  }
  render(additionCards(newCard))
}

const resetForm = () => {
  popupFormTypeMesto.reset()
}

const savePopupFormMesto = (event) => {
  event.preventDefault()
  transferContentMesto()
  resetForm()
  mestoValidatorForm.disabledButttonState()
  closePopup(popupTypeMesto)
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

const render = (cardElement) => {
  gridConteiner.prepend(cardElement)
}

const additionCards = (item) => {
  const card = new Card(item, '#grid-content')
  const cardElement = card._createCard()
  return cardElement
}

initialCards.forEach((item) => {
  render(additionCards(item))
})

clickOverlayClosedPopup()
popupFormTypeMesto.addEventListener('submit', savePopupFormMesto)
popupFormTypeProfile.addEventListener('submit', savePopupFormProfile)
clickCrossPopupClosed()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
profileValidatorForm.enableValidation()
mestoValidatorForm.enableValidation()
