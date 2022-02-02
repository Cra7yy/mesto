const profileEditor = document.querySelector('.profile__editor')
const profileMesto = document.querySelector('.profile__mesto')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const gridTemplate = document.querySelector('#grid-content').content
const gridConteiner = document.querySelector('.grid-conteiner')

const popupTypeImage = document.querySelector('.popup_type_image')
const popupImageSrc = popupTypeImage.querySelector('.popup-image__src')
const popupImageName = popupTypeImage.querySelector('.popup-image__name')

const popupTypeProfile = document.querySelector('.popup_type_profile')
const popupFormTypeProfile = popupTypeProfile.querySelector('.popup__form_type_profile')
const popupInputValueName = popupTypeProfile.querySelector('.popup__input_value_name')
const popupInputValueSign = popupTypeProfile.querySelector('.popup__input_value_sign')

const popupTypeMesto = document.querySelector('.popup_type_mesto')
const popupFormTypeMesto = popupTypeMesto.querySelector('.popup__form_type_mesto')
const popupInputValueMesto = popupTypeMesto.querySelector('.popup__input_value_mesto')
const popupInputValueSrc = popupTypeMesto.querySelector('.popup__input_value_src')

const popupCrosses = document.querySelectorAll('.popup__cross')


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

const render = (initialCards) => {
  initialCards.forEach(additionCards)
}

const additionCards = (card) => {
  gridConteiner.prepend(renderCards(card))
}


const renderCards = (card) => {
  const gridContent = gridTemplate.cloneNode(true)
  gridContent.querySelector('.grid-element__title').textContent = card.name
  gridContent.querySelector('.grid-element__img').src = card.link
  gridContent.querySelector('.grid-element__img').alt = card.name

  clickElement(gridContent)
  return gridContent
}

const clickElement = (el) => {
  el.querySelector('.grid-element__like').addEventListener('click', clickLike)
  el.querySelector('.grid-element__remove').addEventListener('click', clickRemove)
  el.querySelector('.grid-element__img').addEventListener('click', openPopupImage)
}

const clickRemove = (event) => {
  event.target.closest('.grid-element').remove()
}

const clickLike = (event) => {
  event.target.classList.toggle('grid-element__like_action')
}

const popupOpen = (el) => {
  el.classList.add('popup_opened')
}

const clickPopupClosed = () => {
  popupCrosses.forEach((el) => {
    el.addEventListener('click', popupClosed)
  })
}

const popupClosed = (event) => {
  event.target.closest('.popup').classList.remove('popup_opened')
}

const openPopupImage = (event) => {
  popupImageSrc.src = event.target.src
  popupImageSrc.alt = event.target.alt
  popupImageName.textContent = event.target.alt

  popupOpen(popupTypeImage)
}

const transferTextContentPopup = () => {
  popupInputValueName.value = profileTitle.textContent
  popupInputValueSign.value = profileSubtitle.textContent
}

const transferTextContentProfile = () => {
  profileTitle.textContent = popupInputValueName.value
  profileSubtitle.textContent = popupInputValueSign.value
}

const savePopupForm = (form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    transferTextContentProfile()
    popupClosed(event)
  })
}

const clickOpenPopupProfile = () => {
  transferTextContentPopup()
  popupOpen(popupTypeProfile)
}

const transferContentMesto = () => {
  const arrMesto = {
    name: '',
    link: ''
  }

  arrMesto.name = popupInputValueMesto.value
  arrMesto.link = popupInputValueSrc.value

  additionCards(arrMesto)
}

const clearingForm = () => {
  popupInputValueMesto.value = ''
  popupInputValueSrc.value = ''
}

const savePopupMesto = (date) => {
  date.addEventListener('submit', (event) => {
    event.preventDefault()
    transferContentMesto()
    clearingForm()
    popupClosed(event)
  })
}

const clickOpenPopupMesto = () => {
  popupOpen(popupTypeMesto)
}

savePopupMesto(popupFormTypeMesto)
savePopupForm(popupFormTypeProfile)
clickPopupClosed()
profileEditor.addEventListener('click', clickOpenPopupProfile)
profileMesto.addEventListener('click', clickOpenPopupMesto)
render(initialCards)

