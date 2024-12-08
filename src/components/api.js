const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
        authorization: '659ae242-6ed6-41db-a9bc-a458220ca35d',
        'Content-Type': 'application/json'
    }
}

export const getUserProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const updateUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const updateAvatarUserProfile = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const updateLikeCard = (id, isLike) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: isLike ? 'DELETE' : 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}