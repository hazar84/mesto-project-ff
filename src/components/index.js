import '../pages/index.css';
import { addCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserProfile, updateUserProfile, updateAvatarUserProfile, getInitialCards, addNewCard, deleteCard } from './api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

const modalWindows = document.querySelectorAll('.popup');

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

const buttonEditAvatarProfile = document.querySelector('.profile__image_edit-button');
const modalEditAvatarProfile = document.querySelector('.popup_type_new-avatar');
const formNewAvatarProfile = document.forms['edit-avatar'];
const avatarPofileInput = formNewAvatarProfile.elements.link;

const formEditPofile = document.forms['edit-profile'];
const namePofileInput = formEditPofile.elements.name;
const jobPofileInput = formEditPofile.elements.description;

const formNewPlace = document.forms['new-place'];
const namePlaceInput = formNewPlace.elements['place-name'];
const linkPlaceInput = formNewPlace.elements.link;

const buttonAddCard = document.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalCard = document.querySelector('.popup_type_image');
const modalCardImage = document.querySelector('.popup__image');
const modalCardParagraph = document.querySelector('.popup__caption');

const modalDeleteCard = document.querySelector('.popup_type_delete-accept');
const formDeleteCard = document.forms['delete-accept'];

const buttonCloseModals = document.querySelectorAll('.popup__close');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// @todo: Глобальные переменные
let myId;
let deleteId;
let deleteCardElement;

// @todo: Функции
function modalClickFunction(nameCard, linkCard) {
    modalCardImage.src = linkCard;
    modalCardImage.alt = nameCard;
    modalCardParagraph.textContent = nameCard;
    openModal(modalCard);
}

function handleFormPofileSubmit(evt) {
    evt.preventDefault();

    const button = formEditPofile.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    updateUserProfile(namePofileInput.value, jobPofileInput.value)
    .then(userData => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(modalEditProfile);
    })
    .catch(err => console.log(err))
    .finally(() => {
        button.textContent = 'Сохранить';
    })
}

function handleFormAvatarPofileSubmit(evt) {
    evt.preventDefault();

    updateAvatarUserProfile(avatarPofileInput.value).then(userData => {
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(modalEditAvatarProfile);
    })
}

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();

    addNewCard(namePlaceInput.value, linkPlaceInput.value)
    .then(newPlaceData => {
        placesList.prepend(addCard(newPlaceData, cardTemplate, myId, openDeleteCard, modalClickFunction, likeCard));
        closeModal(modalAddCard);
    })
}

function openDeleteCard(id, card) {
    openModal(modalDeleteCard);
    deleteId = id;
    deleteCardElement = card;
}

function handleOpenDeleteAccept(evt) {
    evt.preventDefault();

    deleteCard(deleteId).then((data) => {
        deleteCardElement.remove();
        closeModal(modalDeleteCard)
    })
}

// @todo: API
Promise.all([getUserProfile(), getInitialCards()]).then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    myId = userData._id;

    cards.forEach((card) => {
        placesList.append(addCard(card, cardTemplate, myId, openDeleteCard, modalClickFunction, likeCard));
    });
})

// @todo: Слушатели
modalWindows.forEach((item) => {
    item.classList.add('popup_is-animated'),
    item.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal(evt.target);
        }
    })
});

buttonEditProfile.addEventListener('click', () => {
    namePofileInput.value = profileTitle.textContent;
    jobPofileInput.value = profileDescription.textContent;
    clearValidation(formEditPofile, validationConfig);
    openModal(modalEditProfile);
});

buttonEditAvatarProfile.addEventListener('click', () => {
    formNewAvatarProfile.reset();
    clearValidation(formNewAvatarProfile, validationConfig);
    openModal(modalEditAvatarProfile);
})

buttonAddCard.addEventListener('click', () => {
    formNewPlace.reset();
    clearValidation(formNewPlace, validationConfig);
    openModal(modalAddCard);
});

buttonCloseModals.forEach(item => {
    const modal = item.closest('.popup');
    item.addEventListener('click', () => {
        closeModal(modal);
    })
})

formEditPofile.addEventListener('submit', handleFormPofileSubmit);
formNewAvatarProfile.addEventListener('submit', handleFormAvatarPofileSubmit);
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);
formDeleteCard.addEventListener('submit', handleOpenDeleteAccept);

enableValidation(validationConfig);