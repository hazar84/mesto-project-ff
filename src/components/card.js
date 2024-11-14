// @todo: Функция создания карточки
function addCard(nameCard, linkCard, cardTemplate, clickFunction, modalClickFunction, likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const buttonLikeCard = cardElement.querySelector('.card__like-button');

    cardImage.src = linkCard;
    cardImage.alt = nameCard;
    cardTitle.textContent = nameCard;

    cardDeleteButton.addEventListener('click', () => clickFunction(cardElement));

    cardImage.addEventListener('click', () => {
        modalClickFunction(nameCard, linkCard);
    });

    buttonLikeCard.addEventListener('click', likeCard);

    return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(card) {
    card.remove();
}

// @todo: Функция лайка карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { addCard, removeCard, likeCard };