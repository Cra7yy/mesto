import Card from '../componenets/Card.js'
import FormValidator from '../componenets/FormValidator.js';
import Section from '../componenets/Section.js'
import PopupWithForm from '../componenets/PopupWithForm.js'
import PopupWithImage from '../componenets/PopupWithImage.js'
import UserInfo from '../componenets/UserInfo.js'

import {
  initialCards,
  validationConfig,
  profileEditor,
  profileMesto,
  gridConteiner,
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

      gridConteiner.prepend(createCard(card))
    }
  },
  '.popup_type_mesto'
)

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

const createCard = (itemEl)=> {
  const card = new Card({
    item: itemEl,
    open: () => {
      const popupWithImage = new PopupWithImage(itemEl, '.popup_type_image')
      popupWithImage.open()
      popupWithImage.addEventListeners()
    }
  }, '#grid-content')
  const cardElement = card.createCard()
  return cardElement
}

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
  popupProfileWithForm.addEventListeners()
}

const clickOpenPopupMesto = () => {
  mestoValidatorForm.disabledButttonState()
  popupMestoWithForm.open()
  popupMestoWithForm.addEventListeners()
}

sectionRender.renderItems()

profileValidatorForm.enableValidation()
mestoValidatorForm.enableValidation()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
