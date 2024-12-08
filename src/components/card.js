import { deleteCard, updateLikeCard } from './api.js';

// @todo: Функция создания карточки
function addCard(cardData, cardTemplate, userId, clickFunction, modalClickFunction, likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const buttonLikeCard = cardElement.querySelector('.card__like-button');
    const cardLikeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;

    const listLikeCards = cardData.likes.find(user => user['_id'] === userId);

    if (userId !== cardData.owner._id) {
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', () => clickFunction(cardData._id, cardElement));
    }

    cardImage.addEventListener('click', () => {
        modalClickFunction(cardData.name, cardData.link);
    });

    if (listLikeCards) {
        buttonLikeCard.classList.add('card__like-button_is-active');
    }

    buttonLikeCard.addEventListener('click', (evt) => {
        likeCard(buttonLikeCard, cardData._id, cardLikeCount)
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(card, id) {
    deleteCard(id).then(data => {
        card.remove();
    })
}

// @todo: Функция лайка карточки
function likeCard(button, id, countElement) {
    const like = button.classList.contains('card__like-button_is-active');

    updateLikeCard(id, like).then(cardData => {
        button.classList.toggle('card__like-button_is-active');
        countElement.textContent = cardData.likes.length
    })


}

export { addCard, removeCard, likeCard };