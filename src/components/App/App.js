import './App.css';
import { Route, Routes, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useState } from 'react';
import { api } from '../../utils/ApiService';

function App() {
  const [user, setUser] = useState(null);

  const handleRegister = (fields, errorCallback) => {
    if (!fields.email || !fields.password || !fields.name) {
      return;
    }
    return api.register(fields).then(setUser);
  };
  console.log('user', user);
  const isAuth = !!user;
  return (
    <div className="App">
      <main className="main">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header loggedIn={isAuth} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header loggedIn={isAuth} />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={isAuth} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            exact
            path="/signin"
            element={<Login />}
          />
          <Route
            exact
            path="/profile"
            element={
              <>
                <Header loggedIn={isAuth} />
                <Profile />
              </>
            }
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
