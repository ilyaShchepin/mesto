export default class Card {
  constructor(date, templateSelector, handleClickImage) {
    this._name = date.name;
    this._link = date.link;
    this._templateSelector = templateSelector;
    this._handleClickImage = () => handleClickImage({name:this._name, link:this._link});
  }

  createCard() {
    this._searchCard();
    this._cardElementList = this._card.querySelector('.element__like');
    this._title = this._card.querySelector('.element__title');
    this._title.textContent = this._name;
    this._image = this._card.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setEventListener();
    
    
    return this._card
  }

  _likeCard() {
    this._cardElementList.classList.toggle('element__like_active');
  }

  _deleteCard(){
    this._card.remove()
  }

  _setEventListener() {
    this._cardElementList.addEventListener('click', () => {
      this._likeCard()});
    const elementTrash = this._card.querySelector('.element__trash');
    elementTrash.addEventListener('click', () => {
      this._deleteCard()});
    this._image.addEventListener('click', this._handleClickImage);
  }

  _searchCard() {
    this._card = document.querySelector(this._templateSelector).content.querySelector('.element__list').cloneNode(true);
  }
}