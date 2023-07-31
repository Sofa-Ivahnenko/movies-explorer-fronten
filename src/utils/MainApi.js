import { API_URL } from './config';

class MainApi {
  _token = null;

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._checkToken();
  }

  async _response(response) {
    if (response.ok) {
      return response.json();
    }
    const result = await response.json();
    if (result?.message === 'Validation failed') {
      const message = result?.validation?.body?.message;
      return Promise.reject(`Ошибка: ${message}`);
    }
    return Promise.reject(`Ошибка: ${result?.message}`);
  }

  async _request(url, options) {
    return fetch(url, options).then(this._response);
  }

  async _checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this._token = token;
      try {
        await this._request(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this._token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Ошибка проверки токена:', error);
        this.removeToken();
      }
    }
  }

  async register(body) {
    const result = await this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    this._token = result.token;
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    return result?.data;
  }

  async login(body) {
    const result = await this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });
    this._token = result.token;
    localStorage.setItem('token', result.token);
    return result.data;
  }

  async checkToken() {
    if (!this._token) {
      throw new Error('Токен не задан');
    }
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getProfile() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getInitialCards() {
    return this._request(`${this._baseUrl}/movies/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async addNewCard(obj) {
    return this._request(`${this._baseUrl}/movies/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: obj.country,
        director: obj.director,
        duration: obj.duration,
        year: obj.year,
        description: obj.description,
        image: 'https://api.nomoreparties.co' + obj.image.url,
        trailerLink: obj.trailerLink,
        thumbnail:
          'https://api.nomoreparties.co' + obj.image.formats.thumbnail.url,
        movieId: obj.id,
        nameRU: obj.nameRU,
        nameEN: obj.nameEN,
      }),
    });
  }

  async deleteCard(id) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async setProfile(obj) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: obj.name,
        email: obj.email,
      }),
    });
  }

  async changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
      });
    }
  }

  async setAvatar(obj) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    });
  }

  removeToken() {
    this._token = null;
    localStorage.removeItem('token');
  }
}

export const api = new MainApi({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
