import '../pages/index.css'

import Card from './Card.js'
import FormValidator from './FormValidator.js';
import {
  initialCards
} from './initialCards.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import UserInfo from './UserInfo.js'

const validationConfig = {
  popupSubmitAction: 'popup__submit_action',
  popupSubmit: '.popup__submit',
  popupInput: '.popup__input',
  popupInputErrorAction: 'popup__input-error_action',
  popupInputTypeError: 'popup__input_type_error'
}

const profileEditor = document.querySelector('.profile__editor')
const profileMesto = document.querySelector('.profile__mesto')
const gridConteiner = document.querySelector('.grid-conteiner')

const profileValidatorForm = new FormValidator(validationConfig, '.popup_type_profile')
const mestoValidatorForm = new FormValidator(validationConfig, '.popup_type_mesto')

export const popups = document.querySelectorAll('.popup')
export const popupCrosses = document.querySelectorAll('.popup__cross')
export const popupTypeImage = document.querySelector('.popup_type_image')
export const popupImageSrc = popupTypeImage.querySelector('.popup-image__src')
export const popupImageName = popupTypeImage.querySelector('.popup-image__name')

const sectionRender = new Section({
    items: initialCards,
    renderer: (el) => {
      sectionRender.addItem(additionCards(el))
    }
  },
  '.grid-conteiner'
)

const popupMestoWithForm = new PopupWithForm({
    popupSubmitForm: (item) => {
      const card = {
        name: item.name,
        link: item.link
      }
      mestoValidatorForm.disabledButttonState()
      gridConteiner.prepend(additionCards(card))
    }
  },
  '.popup_type_mesto'
)

const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  popupInputValueName: '.popup__input_value_name',
  popupInputValueSign:'.popup__input_value_sign'
})

const popupProfileWithForm = new PopupWithForm({
    popupSubmitForm: (item) => {
      userInfo.transferTextContentProfile(item)
    }
  },
  '.popup_type_profile'
)

function additionCards(itemEl) {
  const card = new Card({
    item: itemEl,
    openPopupImage: () => {
      const popupWithImage = new PopupWithImage(itemEl, '.popup_type_image')
      popupWithImage.openPopupImage()
      popupWithImage.addEventListeners()
    }
  }, '#grid-content')
  const cardElement = card.createCard()
  return cardElement
}

const clickOpenPopupProfile = () => {
  profileValidatorForm.actionButttonState()
  profileValidatorForm.resetError()
  userInfo.transferTextContentPopup()
  popupProfileWithForm.openPopup()
  popupProfileWithForm.addEventListeners()
}

const clickOpenPopupMesto = () => {
  popupMestoWithForm.openPopup()
  popupMestoWithForm.addEventListeners()
}

sectionRender.renderItems()
profileValidatorForm.enableValidation()
mestoValidatorForm.enableValidation()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
