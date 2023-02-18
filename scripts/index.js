let profileButtonEdit = document.querySelector('.profile__edit-button');
let closeButtonPopup = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let discriptionInput = document.querySelector('.popup__input_type_discription');
let userNameElement = document.querySelector('.profile__title');
let userDiscriptionElement = document.querySelector('.profile__subtitle');

profileButtonEdit.addEventListener('click', function() {
  nameInput.value = userNameElement.textContent;
  discriptionInput.value = userDiscriptionElement.textContent;
  popup.classList.add('popup_opened');
});

function closePopup() {
   popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  userNameElement.textContent = nameInput.value;
  userDiscriptionElement.textContent = discriptionInput.value;
  closePopup();
}

closeButtonPopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
