class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      }).then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.sign
        })
      }).then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }).then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes  `, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes  `, {
        method: "PUT",
        headers: this._headers,
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
        })
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status)
      })
      .catch(console.log)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'f09e6dbd-f0d9-4e49-91dc-b9612ffd8da0',
    'Content-Type': 'application/json'
  }
})
