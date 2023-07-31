import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import Toggle from '../CheckBox/CheckBox';

const SearchForm = (props) => {
  const { filter, onChangeFilter, onSearch } = props;
  const { pathname } = useLocation();
  return (
    <section className="search-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
        className={`search ${
          pathname !== '/movies' ? '/saved-movies' : 'search_saved'
        }`}
      >
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            value={filter?.searchText || ''}
            onChange={(evevt) =>
              onChangeFilter({ ...filter, searchText: evevt.target.value })
            }
          />
          <button
            type="submit"
            className="search__button"
          ></button>
          <Toggle
            className="search__checkbox"
            value={filter?.isShortMovies}
            onChange={(value) =>
              onChangeFilter({ ...filter, isShortMovies: value })
            }
          />
        </div>
        <div className="search__toggle search__toggle-update">
          <Toggle
            className="search__checkbox_mobile"
            value={filter?.isShortMovies}
            onChange={(value) => {
              console.log(value);
              onChangeFilter({ ...filter, isShortMovies: value });
            }}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
