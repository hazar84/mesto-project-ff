import '../pages/index.css';
import { initialCards } from './cards.js';
import { addCard, removeCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

const modalWindows = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const formNewPlace = document.forms['new-place'];
const namePlaceInput = formNewPlace.elements['place-name'];
const linklaceInput = formNewPlace.elements.link;

const buttonAddCard = document.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalCard = document.querySelector('.popup_type_image');
const modalCardImage = document.querySelector('.popup__image');
const modalCardParagraph = document.querySelector('.popup__caption');

const buttonCloseModals = document.querySelectorAll('.popup__close');

// @todo: Функции
function modalClickFunction(nameCard, linkCard) {
    modalCardImage.src = linkCard;
    modalCardImage.alt = nameCard;
    modalCardParagraph.textContent = nameCard;
    openModal(modalCard);
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(modalEditProfile);
}

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const NewPlaceCard = {
        name: namePlaceInput.value,
        link: linklaceInput.value
    }
    placesList.prepend(addCard(NewPlaceCard.name, NewPlaceCard.link, cardTemplate, removeCard, modalClickFunction, likeCard));
    closeModal(modalAddCard);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    placesList.append(addCard(item.name, item.link, cardTemplate, removeCard, modalClickFunction, likeCard));
});

// @todo: Слушатели
modalWindows.forEach((item) => {item.classList.add('popup_is-animated')});

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(modalEditProfile);
});

buttonAddCard.addEventListener('click', () => {
    formNewPlace.reset();
    openModal(modalAddCard);
});

buttonCloseModals.forEach(item => {
    const modal = item.closest('.popup');
    item.addEventListener('click', () => {
        closeModal(modal);
    })
})

formElement.addEventListener('submit', handleFormSubmit);
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);