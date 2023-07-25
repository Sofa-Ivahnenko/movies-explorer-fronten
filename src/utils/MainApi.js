class MainApi {
	constructor(options) {
		this._baseUrl = options.baseUrl;
	};

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	// получение информации о пользователе с сервера
	getUserInfo() {
		const jwt = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`,
			},
		}).then(res => this._getResponse(res));
	}

	// сохранение отредактированных данных пользователя на сервере
	updateUserInfo(name, email) {
		const jwt = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`,
			},
			body: JSON.stringify({
				name,
				email
			})
		}).then(res => this._getResponse(res));
	}

	// получение избранных пользователем фильмов с сервера
	getMovies() {
		const jwt = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/movies`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`,
			}
		}).then(res => this._getResponse(res));
	}

	// добавление нового фильма в избранное
	addMovies({
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		nameRU,
		nameEN,
		thumbnail,
		id
	}) {
		const jwt = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`,
			},
			body: JSON.stringify({
				country: country || 'no country',
				director,
				duration,
				year,
				description,
				image,
				trailer: trailerLink,
				nameRU: nameRU || 'no name',
				nameEN: nameEN || 'no name',
				thumbnail,
				movieId: id
			})
		}).then(res => this._getResponse(res));
	}

	// удаление карточки пользователя с сервера
	deleteMovies(movieId) {
		const jwt = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`,
			},
		}).then(res => this._getResponse(res));
	}

	// регистрация пользователя
	registerUser(name, email, password) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				password
			}),
		}).then(res => this._getResponse(res));
	};

	// авторизация пользователя
	loginUser(email, password) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			}),
		}).then(res => this._getResponse(res));
	};

	getToken(jwt) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${jwt}`
			},
		}).then(res => this._getResponse(res));
	}
};

//создание экземпляра класса
const mainApi = new MainApi({
	baseUrl: 'https://api.diplom.movies.nomoredomains.work',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('jwt')}`
	},
});

export default mainApi;