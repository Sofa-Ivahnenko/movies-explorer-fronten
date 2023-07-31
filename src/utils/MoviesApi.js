import { MOVIES_API_URL } from "./config";

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async _response(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Произошла ошибка: ${response.status}`);
    }

    async _request(url, options) {
        return fetch(url, options).then(this._response);
    }

    getAllMovies() {
        return this._request(`${this._baseUrl}/beatfilm-movies`, {
            method: "GET",
            headers: this._headers,
        })
    }
}

export const moviesApi = new MoviesApi({
    baseUrl : MOVIES_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
