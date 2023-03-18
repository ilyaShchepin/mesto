const profileButtonEdit = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const discriptionInput = document.querySelector('.popup__input_type_discription');
const userNameElement = document.querySelector('.profile__title');
const userDiscriptionElement = document.querySelector('.profile__subtitle');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const formAddCard = document.querySelector('.popup__form_type_card');
const elementsContainer = document.querySelector('.element');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function addPopup (popup) {
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('mousedown', closeClick);
}

function removePopup (popup) {
  document.removeEventListener('keydown', closeEsc);
  popup.removeEventListener('mousedown', closeClick);
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closeProfilePopup(popup);
  }
}

function closeClick(evt) {
  closeProfilePopup(evt.target);
}

function openPopupAdd () {
  formAddCard.reset()
  openPopup(popupAdd);
  resetError(popupAdd, config);
}

//открытие попапа редоктирования профиля
function openProfilePopup() {
  nameInput.value = userNameElement.textContent;
  discriptionInput.value = userDiscriptionElement.textContent;
  openPopup(popupEditForm);
  resetError(popupEditForm, config);
}

function openPopup (item) {
  item.classList.add('popup_opened');
  addPopup(item);
}

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeProfilePopup(popup))
  console.log(popup)
 })

//закрытие попапа редактирования профиля
function closeProfilePopup(button) {
   button.classList.remove('popup_opened');
   removePopup(button);
}

//сохранение изменений и закрытие попапа
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userNameElement.textContent = nameInput.value;
  userDiscriptionElement.textContent = discriptionInput.value;
  closeProfilePopup(popupEditForm);
}

profileButtonEdit.addEventListener('click', () => openProfilePopup(popupEditForm));
profileForm.addEventListener('submit', handleProfileFormSubmit);

//5 спринт
const profileButtonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-form');
const closeButtonsPopupAdd = document.querySelector('.popup__close-button_type_add');

//открытие попапа добавления места
profileButtonAdd.addEventListener('click', openPopupAdd);




function createCard(card) {
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElementList = cardTemplate.querySelector('.element__list').cloneNode(true);
  const elementImage = cardElementList.querySelector('.element__image');
  cardElementList.querySelector('.element__title').textContent = card.name;

  cardElementList.querySelector('.element__title').textContent = card.name;
  elementImage.setAttribute('src', card.link);
  elementImage.setAttribute('alt', card.name);
  
  elementImage.addEventListener('click', function() {
    openImagePopup(card);
    console.log(elementImage)
  });
  

  cardElementList.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })

  const deleteButton = cardElementList.querySelector('.element__trash');
  deleteButton.addEventListener('click', handleDeleteButton)
  return cardElementList;
} 

function handleDeleteButton(event) { 
  const button = event.target
  const card = button.closest('.element__list')
  card.remove() 
}

function renderCard (item) {
  elementsContainer.prepend(createCard(item));
}

initialCards.forEach(renderCard)

formAddCard.addEventListener('submit', addCard);

function addCard (card) {
  card.preventDefault();
  closeProfilePopup(popupAdd);
  renderCard({
    name:inputPlace.value,
    link:inputLink.value,
  })
  formAddCard.reset();
}

const popupImage = document.querySelector('.popup_type_image');
const popupPic = document.querySelector('.popup__pic');
const popupPicTitle = document.querySelector('.popup__pic-title');
const closeButtonsPopupPic =document.querySelector('.popup__close-button_type_pic');

function openImagePopup (card) {
  popupPic.src = card.link,
  popupPic.alt = card.name,
  popupPicTitle.textContent = card.name,
  openPopup(popupImage)
}

