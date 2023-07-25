// import './App.css';
// import { Route, Switch } from 'react-router-dom';
// import Header from '../Header/Header';
// import Main from '../Main/Main';
// import Footer from '../Footer/Footer';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Profile from '../Profile/Profile';
// import PageNotFound from '../PageNotFound/PageNotFound';

// function App() {
// 	return (
// 		<div className="App">
// 			<main className="main">
// 				<Switch>
// 					<Route exact path="/">
// 						<Header loggedIn={false} />
// 						<Main />
// 						<Footer />
// 					</Route>
// 					<Route path="/movies">
// 						<Header loggedIn={true} />
// 						<Movies />
// 						<Footer />
// 					</Route>
// 					<Route exact path="/saved-movies">
// 						<Header loggedIn={true} />
// 						<SavedMovies />
// 						<Footer />
// 					</Route>
// 					<Route exact path="/signup">
// 						<Register />
// 					</Route>
// 					<Route exact path="/signin">
// 						<Login />
// 					</Route>
// 					<Route exact path="/profile">
// 						<Header loggedIn={true} />
// 						<Profile />
// 					</Route>
// 					<Route path="*">
// 						<PageNotFound />
// 					</Route>
// 				</Switch>
// 			</main>
// 		</div>
// 	);
// }

// export default App;

import './App.css';
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import { SUCCESSFUL_CODE } from '../../utils/constants';

function App() {
	const history = useHistory();

	const [currentUser, setCurrentUser] = React.useState({});
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const [emailValue, setEmailValue] = React.useState(null);
	const [savedMovies, setSavedMovies] = React.useState([]);
	const [isError, setIsError] = React.useState(false);
	const [infoMessage, setInfoMessage] = React.useState({
		isShown: false,
		message: '',
		code: SUCCESSFUL_CODE,
	});

	React.useEffect(() => {
		const token = localStorage.getItem('jwt');
		if (token) {
			mainApi
				.getToken(token)
				.then((res) => {
					if (res) {
						setIsLoggedIn(true);
						setEmailValue(res.email);
						history.push('/movies');
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [history]);

	// при логине обновляем стейты при получении пользователя
	React.useEffect(() => {
		setIsLoading(true);
		mainApi.getUserInfo()
			.then(data => {
				handleLoggedIn();
				setCurrentUser(data);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => setIsLoading(false))
	}, [isLoggedIn]);

	// при загрузке страницы получаем данные избранных пользователем фильмов
	React.useEffect(() => {
		if (isLoggedIn) {
			mainApi.getMovies()
				.then((data) => {
					setSavedMovies(data);
					setIsError(false);
				})
				.catch(err => {
					setIsError(true);
					console.log(err);
				})
		}
	}, [isLoggedIn]);

	// обработчик установки входа/логина пользователя
	function handleLoggedIn() {
		setIsLoggedIn(true);
	};

	// обработчик регистрации пользователя
	function onRegister(name, email, password) {
		mainApi.registerUser(name, email, password)
			.then(data => {
				if (data) {
					console.log(data);
					onLogin(data.email, password);
				}
			})
			.catch(({ message, statusCode }) => {
				setInfoMessage({
					...infoMessage,
					isShown: true,
					message,
					code: statusCode,
					type: 'register',
				});
			})
	};

	// обработчик авторизации пользователя
	function onLogin(email, password) {
		setIsLoading(true);
		mainApi.loginUser(email, password)
			.then(res => {
				localStorage.setItem('jwt', res.token);
				handleLoggedIn();
				setEmailValue(email);
				history.push('/movies');
			})
			.catch(({ message, statusCode }) => {
				setInfoMessage({
					...infoMessage,
					isShown: true,
					message,
					code: statusCode,
					type: 'login',
				});
			})
			.finally(() => setIsLoading(false))
	};
	// Обработчик выхода пользователя
	function onLogOut() {
		localStorage.removeItem('jwt');
		setIsLoggedIn(false);
		setEmailValue(null);
		setCurrentUser('');
		setSavedMovies([]);
		history.push('/signin');
		localStorage.removeItem('movies');
		localStorage.removeItem('searchQuery');
		localStorage.removeItem('shortFilms');
		localStorage.removeItem('savedMovies');
	}

	// обработчик изменения данных пользователя
	function updateUserInfo(name, email) {
		mainApi.updateUserInfo(name, email)
			.then(data => {
				setCurrentUser(data);
				setInfoMessage({
					...infoMessage,
					isShown: true,
					type: 'profile',
				});
			})
			.catch(({ message, statusCode }) => {
				setInfoMessage({
					...infoMessage,
					isShown: true,
					message,
					code: statusCode,
					type: 'profile',
				});
			})
	};

	// обработчик добавления фильма в избранное
	function handleSaveMovie(movie) {
		mainApi.addMovies(movie)
			.then(newCard => {
				setSavedMovies([newCard, ...savedMovies]);
			})
			.catch(err => console.log(err))
	};

	// обработчик удаления фильма из избранного
	function deleteMovies(movie) {
		mainApi.deleteMovies(movie._id)
			.then(() => {
				const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
				setSavedMovies(newMoviesList);
			})
			.catch(err => console.log(err))
	};

	// обработчик сброса вывода сообщения с сервера
	function onClickResetInfoMessage() {
		if (infoMessage.isShown) {
			setInfoMessage({
				...infoMessage,
				isShown: false,
				message: '',
				type: '',
				code: SUCCESSFUL_CODE,
			});
		}
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>

			<div className='app' onClick={infoMessage.isShown ? onClickResetInfoMessage : null}>
				{isLoading ? (
					<Preloader />
				) : (
					<>
						<Header isLoggedIn={isLoggedIn} email={emailValue} />

						<Switch>
							<ProtectedRoute
								exact path='/movies'
								isLoggedIn={isLoggedIn}
								component={Movies}
								savedMoviesList={savedMovies}
								onLikeClick={handleSaveMovie}
								onDeleteClick={deleteMovies}
							/>

							<ProtectedRoute
								exact path='/saved-movies'
								isLoggedIn={isLoggedIn}
								component={SavedMovies}
								list={savedMovies}
								onDeleteClick={deleteMovies}
								isError={isError}
							/>

							<ProtectedRoute
								exact path='/profile'
								isLoggedIn={isLoggedIn}
								component={Profile}
								onSignOut={onLogOut}
								onUpdate={updateUserInfo}
								infoMessage={infoMessage}
							/>

							<Route path='/' exact>
								<Main />
							</Route>

							<Route path='/signup'>
								{isLoggedIn ? <Redirect to='/movies' /> : <Register onRegister={onRegister} infoMessage={infoMessage} />}
							</Route>

							<Route path='/signin'>
								{isLoggedIn ? <Redirect to='/movies' /> : <Login onLogin={onLogin} infoMessage={infoMessage} />}
							</Route>

							<Route path="*">
								<PageNotFound />
							</Route>

						</Switch>

						<Footer />
					</>
				)}
			</div>

		</CurrentUserContext.Provider>
	);
};

export default App;
