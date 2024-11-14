function openModal(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('mousedown', clickOverlay);
    document.addEventListener('keydown', keyEscape);
}

function closeModal(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('mousedown', clickOverlay);
    document.removeEventListener('keydown', keyEscape);
}

function clickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}

function keyEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

export { openModal, closeModal }