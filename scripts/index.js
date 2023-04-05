import Card from "./Card.js"
import { config, initialCards } from "./Constans.js";
import { FormValidator } from "./FormValidator.js";

const profileButtonEdit = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const profileForm = new FormValidator(config, document.querySelector('.popup__form_type_profile'));
const formAddCard = new FormValidator(config, document.querySelector('.popup__form_type_card'));
[profileForm, formAddCard].forEach((form) => form.enableValidation()); 
const nameInput = document.querySelector('.popup__input_type_name');
const discriptionInput = document.querySelector('.popup__input_type_discription');
const userNameElement = document.querySelector('.profile__title');
const userDiscriptionElement = document.querySelector('.profile__subtitle');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const elementsContainer = document.querySelector('.element');
const popupImage = document.querySelector('.popup_type_image');
const popupPic = document.querySelector('.popup__pic');
const popupPicTitle = document.querySelector('.popup__pic-title');
const closeButtonsPopupPic = document.querySelector('.popup__close-button_type_pic');


function setCloseListeners (popup) {
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', handleOverlay);
}

function removeCloseListeners (popup) {
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', handleOverlay);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function openPopupAdd () {
  formAddCard.form.reset()
  openPopup(popupAdd);
  formAddCard.resetValidation();
}

//открытие попапа редоктирования профиля
function openProfilePopup() {
  nameInput.value = userNameElement.textContent;
  discriptionInput.value = userDiscriptionElement.textContent;
  openPopup(popupEditForm);
  profileForm.resetValidation();
}

function openPopup (item) {
  item.classList.add('popup_opened');
  setCloseListeners(item);
}

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
  console.log(popup)
 })

function closePopup(popup) {
   popup.classList.remove('popup_opened');
   removeCloseListeners(popup);
}

//сохранение изменений и закрытие попапа
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userNameElement.textContent = nameInput.value;
  userDiscriptionElement.textContent = discriptionInput.value;
  closePopup(popupEditForm);
}

profileButtonEdit.addEventListener('click', () => openProfilePopup(popupEditForm));
profileForm.form.addEventListener('submit', handleProfileFormSubmit);

//5 спринт
const profileButtonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-form');
const closeButtonsPopupAdd = document.querySelector('.popup__close-button_type_add');

//открытие попапа добавления места
profileButtonAdd.addEventListener('click', openPopupAdd);




function createCard(card) {
  const newCard = new Card(card, "#template-card", openImagePopup);
  return newCard.createCard();
  };
  
function renderCard (card) {
  elementsContainer.prepend(card);
}

initialCards.forEach(item => renderCard(createCard(item)))

formAddCard.form.addEventListener('submit', addCard);

function addCard (card) {
  card.preventDefault();
  closePopup(popupAdd);
  renderCard({
    name:inputPlace.value,
    link:inputLink.value,
  })
  formAddCard.form.reset();
}

function openImagePopup (card) {
  popupPic.src = card.link,
  popupPic.alt = card.name,
  popupPicTitle.textContent = card.name,
  openPopup(popupImage)
}

