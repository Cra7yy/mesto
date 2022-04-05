import Card from '../componets/Card.js'
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js'
import PopupWithForm from '../componets/PopupWithForm.js'
import PopupWithImage from '../componets/PopupWithImage.js'
import UserInfo from '../componets/UserInfo.js'
import {
  api
} from '../componets/Api.js'

import {
  validationConfig,
  profileEditor,
  profileMesto,
  popupInputValueName,
  popupInputValueSign,
  profileImgShadow
} from '../utils/constans.js'

import './index.css'

const profileValidatorForm = new FormValidator(validationConfig, '.popup_type_profile')
const mestoValidatorForm = new FormValidator(validationConfig, '.popup_type_mesto')
const avatarValidatorForm = new FormValidator(validationConfig, '.popup_type_avatar')

let userId

api.getProfile()
  .then((res) => {
    userInfo.setUserInfo(res)
    userId = res._id
  })
  .catch(console.log)

api.getInitialCards()
  .then((cardList) => {
    cardList.forEach(data => {
      const card = {
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      }
      sectionRender.addItem(createCard(card))
    })
  })
  .catch(console.log)

const sectionRender = new Section({
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
        link: item.src,
      }
      api.addCard(card)
        .then((res) => {
          const card = {
            name: res.name,
            link: res.link,
            likes: res.likes,
            id: res._id,
            userId: userId,
            ownerId: res.owner._id
          }
          sectionRender.addItem(createCard(card))
          popupMestoWithForm.close()
          popupMestoWithForm.submitRendering(false)
        })
        .catch(console.log)
        .finally(popupMestoWithForm.submitRendering(true))
    }
  },
  '.popup_type_mesto'
)

popupMestoWithForm.addEventListeners()

const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  profileImg: '.profile__img'
})

const popupProfileWithForm = new PopupWithForm({
    handleSubmit: (item) => {
      api.editProfile(item)
        .then((res) => {
          console.log(res)
          userInfo.setUserInfo(res)
          popupProfileWithForm.close()
          popupProfileWithForm.submitRendering(false)
        })
        .catch(console.log)
        .finally(popupProfileWithForm.submitRendering(true))
    }
  },
  '.popup_type_profile'
)

popupProfileWithForm.addEventListeners()

const avatarPopup = new PopupWithForm({
  handleSubmit: (item) => {
    api.updateAvatar(item.avatar)
      .then((res) => {
        userInfo.setUserInfo(res)
        avatarPopup.close()
        avatarPopup.submitRendering(false)
      })
      .catch(console.log)
      .finally(avatarPopup.submitRendering(true))
  }
}, '.popup_type_avatar')

avatarPopup.addEventListeners()

const confirmPopup = new PopupWithForm(() => {}, '.popup_type_delete')
confirmPopup.addEventListeners()

const createCard = (itemEl) => {
  const card = new Card({
      item: itemEl,
      open: () => {
        popupWithImage.open(itemEl)
      }
    }, '#grid-content',
    (id) => {
      confirmPopup.open()
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.clickRemove()
            confirmPopup.close()
          })
          .catch(console.log)
      })
    }, (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch(console.log)
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch(console.log)
      }
    }
  )
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

const clickOpenPopupAvatar = () => {
  avatarValidatorForm.disabledButttonState()
  avatarPopup.open()
}

profileValidatorForm.enableValidation()
mestoValidatorForm.enableValidation()
avatarValidatorForm.enableValidation()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
profileImgShadow.addEventListener('click', clickOpenPopupAvatar)
