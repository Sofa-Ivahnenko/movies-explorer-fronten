import './SearchForm.css';
import { useLocation } from 'react-router-dom';

const SearchForm = () => {
  const { pathname } = useLocation();
  return (
    <section className="search-form">
      <form
        className={`search ${
          pathname !== '/movies' ? '/saved-movies' : 'search_saved'
        }`}
      >
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            required
          />
          <button
            type="submit"
            className="search__button"
          ></button>
          <div className="search__toggle">
            <div className="search__tumbler">
              <input
                type="checkbox"
                className="search__checkbox"
              />
              <span className="search__slider" />
            </div>
            <p className="search__films">Короткометражки</p>
          </div>
        </div>
        <div className="search__toggle search__toggle-update">
          <div className="search__tumbler">
            <input
              type="checkbox"
              className="search__checkbox"
            />
            <span className="search__slider" />
          </div>
          <p className="search__films">Короткометражки</p>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
