import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useEffect, useState } from 'react';
import { api } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (fields) => {
    if (!fields.email || !fields.password || !fields.name) {
      return;
    }
    return api.register(fields).then((user) => {
      setUser(user);
      navigate('/movies');
    });
  };

  const handleLogin = (fields) => {
    if (!fields.email || !fields.password) {
      return;
    }
    return api
      .login(fields)
      .then(setUser)
      .then(() => {
        navigate('/movies');
      });
  };

  const handleEditProfile = (fields) => {
    return api.setProfile(fields).then(({ data }) => {
      setUser(data);
    });
  };

  const handleLogout = () => {
    api.removeToken();
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .checkToken()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

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
            element={<ProtectedRoute isLogged={isLoading ? true : isAuth} />}
          >
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
              path="/profile"
              element={
                <>
                  <Header loggedIn={isAuth} />
                  <Profile
                    onEdit={handleEditProfile}
                    currentUser={user}
                    onLogout={handleLogout}
                  />
                </>
              }
            />
          </Route>
          <Route
            element={<ProtectedRoute isLogged={isLoading ? true : !isAuth} />}
          >
            <Route
              exact
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              exact
              path="/signin"
              element={<Login onLogin={handleLogin} />}
            />
          </Route>
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
