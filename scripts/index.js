let profileButtonEdit = document.querySelector('.profile__edit-button');
const closeButtonPopup = document.querySelectorAll('.popup__close-button');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupForm = document.querySelector('.popup__form');
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

//открытие попапа редоктирования профиля
function openPopup() {
  nameInput.value = userNameElement.textContent;
  discriptionInput.value = userDiscriptionElement.textContent;
  popupOpened(popupEditForm);
}

function popupOpened (item) {
  item.classList.add('popup_opened');
}

closeButtonPopup.forEach(item => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(popup))
  console.log(popup)
 })

//закрытие попапа редактирования профиля
function closePopup(item) {
   item.classList.remove('popup_opened');
}

//сохранение изменений и закрытие попапа
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  userNameElement.textContent = nameInput.value;
  userDiscriptionElement.textContent = discriptionInput.value;
  closePopup(popupEditForm);
}

profileButtonEdit.addEventListener('click', () => openPopup(popupEditForm));
popupForm.addEventListener('submit', handleFormSubmit);

//5 спринт
const profileButtonAdd = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup_type_add-form');
const closeButtonPopupAdd = document.querySelector('.popup__close-button_type_add');

//открытие попапа добавления места
profileButtonAdd.addEventListener('click', function(){
  popupOpened(popupAddForm);
});




function newCard(card) {
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElementList = cardTemplate.querySelector('.element__list').cloneNode(true);
  const elementImage = cardElementList.querySelector('.element__image');
  cardElementList.querySelector('.element__title').textContent = card.name;

  cardElementList.querySelector('.element__title').textContent = card.name;
  cardElementList.querySelector('.element__image').setAttribute('src', card.link);
  cardElementList.querySelector('.element__image').setAttribute('alt', card.name);
  
  elementImage.addEventListener('click', function() {
    popupTypeImage(card);
    console.log(elementImage)
  });
  

  cardElementList.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })

  const deleteButton = cardElementList.querySelector('.element__trash');
  deleteButton.addEventListener('click', hadleDeleteButton)
  return cardElementList;
} 

function hadleDeleteButton(event) { 
  const button = event.target
  const card = button.closest('.element__list')
  card.remove() 
}

function renderCard (item) {
  elementsContainer.prepend(newCard(item));
}

initialCards.forEach(itemsCard => {
  renderCard(itemsCard)
})

formAddCard.addEventListener('submit', addCard);

function addCard (card) {
  card.preventDefault();
  closePopup(popupAddForm);
  renderCard({
    name:inputPlace.value,
    link:inputLink.value,
  })
}

const popupImage = document.querySelector('.popup_type_image');
const popupPic = document.querySelector('.popup__pic');
const popupPicTitle = document.querySelector('.popup__pic-title');
const closeButtonPopupPic =document.querySelector('.popup__close-button_type_pic');

function popupTypeImage (card) {
  popupPic.src = card.link,
  popupPic.alt = card.name,
  popupPicTitle.textContent = card.name,
  popupOpened(popupImage)
}

