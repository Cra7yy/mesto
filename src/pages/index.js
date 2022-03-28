import Card from '../componets/Card.js'
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js'
import PopupWithForm from '../componets/PopupWithForm.js'
import PopupWithImage from '../componets/PopupWithImage.js'
import UserInfo from '../componets/UserInfo.js'

import {
  initialCards,
  validationConfig,
  profileEditor,
  profileMesto,
  popupInputValueName,
  popupInputValueSign
} from '../utils/constans.js'

import './index.css'

const profileValidatorForm = new FormValidator(validationConfig, '.popup_type_profile')
const mestoValidatorForm = new FormValidator(validationConfig, '.popup_type_mesto')

const sectionRender = new Section({
    items: initialCards,
    renderer: (el) => {
      sectionRender.addItem(createCard(el))
    }
  },
  '.grid-conteiner'
)

const popupMestoWithForm = new PopupWithForm({
  handleSubmit: (item) => {
    const card = {
        name: item.title,
        link: item.src
    }
    sectionRender.addItem(createCard(card))
    }
  },
  '.popup_type_mesto'
)

popupMestoWithForm.addEventListeners()

const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
})

const popupProfileWithForm = new PopupWithForm({
    handleSubmit: (item) => {
      userInfo.setUserInfo(item)
    }
  },
  '.popup_type_profile'
)

popupProfileWithForm.addEventListeners()


const createCard = (itemEl)=> {
  const card = new Card({
    item: itemEl,
    open: () => {
      popupWithImage.open(itemEl)
    }
  }, '#grid-content')
  const cardElement = card.createCard()
  return cardElement
}

const popupWithImage = new PopupWithImage('.popup_type_image')
popupWithImage.addEventListeners()


const transferTextContentPopup = () => {
  const info = userInfo.getUserInfo()

  popupInputValueName.value = info.name
  popupInputValueSign.value = info.sign
}

const clickOpenPopupProfile = () => {
  profileValidatorForm.actionButttonState()
  profileValidatorForm.resetError()
  transferTextContentPopup()
  popupProfileWithForm.open()
}

const clickOpenPopupMesto = () => {
  mestoValidatorForm.disabledButttonState()
  popupMestoWithForm.open()
}

sectionRender.renderItems()

profileValidatorForm.enableValidation()
mestoValidatorForm.enableValidation()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
