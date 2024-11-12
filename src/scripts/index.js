import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(nameCard, linkCard, clickFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = linkCard;
    cardImage.alt = nameCard;
    cardTitle.textContent = nameCard;

    cardDeleteButton.addEventListener('click', () => clickFunction(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
const removeCard = function(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    placesList.append(addCard(item.name, item.link, removeCard));
});