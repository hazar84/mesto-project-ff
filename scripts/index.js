// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(nameCard, linkCard, clickFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = linkCard;
    cardElement.querySelector('.card__image').alt = nameCard;
    cardElement.querySelector('.card__title').textContent = nameCard;

    cardElement.querySelector('.card__delete-button').addEventListener('click', clickFunction);

    return cardElement;
}

// @todo: Функция удаления карточки
const removeCard = function(evt) {
    evt.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    placesList.append(addCard(item.name, item.link, removeCard));
});