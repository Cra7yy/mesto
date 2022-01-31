let page = document.querySelector('.page')
let profileEditor = document.querySelector('.profile__editor')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let gridConteiner = document.querySelector('.grid-conteiner')
let profileMesto = document.querySelector('.profile__mesto')
let gridTemplate = document.querySelector('#grid-content').content
let popupImgTemplate = document.querySelector('#pop-up-img').content
let popupProfileTemplate = document.querySelector('#popup-profile').content
let popupMestoId = document.querySelector('#popup-mesto').content
let gridElement = document.querySelectorAll('.grid-element')

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
  initialCards.map(renderCards)
}

const renderCards = (card) => {
  let gridContent = gridTemplate.cloneNode(true)
  gridContent.querySelector('.grid-element__title').textContent = card.name
  gridContent.querySelector('.grid-element__img').src = card.link
  gridContent.querySelector('.grid-element__img').alt = card.name

  clickElement(gridContent)
  gridConteiner.prepend(gridContent)
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
  el.classList.add('pop-up_opened')
  page.append(el)
  clickPopupClosed()
}

const clickPopupClosed = () =>{
document.querySelector('.pop-up__cross').addEventListener('click',popupClosed)
}

const popupClosed = () => {
  document.querySelector('.pop-up').remove('pop-up_opened')
}

const openPopupImage = (event) => {
  let popupImage = popupImgTemplate.cloneNode(true)
  let popup = popupImage.querySelector('.pop-up-image')

  popupImage.querySelector('.pop-up-image__src').src = event.target.src
  popupImage.querySelector('.pop-up-image__src').alt = event.target.alt
  popupImage.querySelector('.pop-up-image__name').textContent = event.target.alt

  popupOpen(popup)
}

// функция переноса текстовых данных из profile в попап
const transferTextContentPopup = () => {
  document.querySelector('.pop-up__input_value_name').value = profileTitle.textContent
  document.querySelector('.pop-up__input_value_sign').value = profileSubtitle.textContent
}

  // функция переноса текстовых данных из попапа в profile
  const transferTextContentProfile = () => {
    profileTitle.textContent = document.querySelector('.pop-up__input_value_name').value
    profileSubtitle.textContent = document.querySelector('.pop-up__input_value_sign').value
  }

  const savePopupForm = (form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      transferTextContentProfile()
      popupClosed()
    })
  }

const clickOpenPopupProfile = () => {
  let popupClone = popupProfileTemplate.cloneNode(true)
  let popup = popupClone.querySelector('.pop-up')
  let popupForm = popupClone.querySelector('.pop-up__form')

  popupOpen(popup)
  transferTextContentPopup()
  savePopupForm(popupForm)
}

const transferContentMesto = () => {
  let arrMesto = [{
    name: '',
    link: ''
  }]

  arrMesto.name = document.querySelector('.pop-up__input_value_mesto').value
  arrMesto.link = document.querySelector('.pop-up__input_value_src').value

  renderCards(arrMesto)
}

const savePopupMesto = (form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    transferContentMesto()
    popupClosed()
  })
}

const clickOpenPopupMesto = () => {
  let popupMestoTemplate = popupMestoId.cloneNode(true)
  let popupMesto = popupMestoTemplate.querySelector('.pop-up-mesto')
  let formMesto = popupMesto.querySelector('.pop-up-mesto__form')

  savePopupMesto(formMesto)
  popupOpen(popupMesto)
}
// функция открытия попапа profile
profileEditor.addEventListener('click', clickOpenPopupProfile)
// функция открытия попапа mesto
profileMesto.addEventListener('click', clickOpenPopupMesto)

render(initialCards)










