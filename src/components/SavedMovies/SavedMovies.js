import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/savedMovies';
import { useState } from 'react';

const SavedMovies = () => {
  const [filter, setFilter] = useState({
    searchText: '',
    isShortMovies: false,
  });
  return (
    <main className="saved-movies">
      <SearchForm
        filter={filter}
        onChangeFilter={setFilter}
      />
      <MoviesCardList
        cards={savedMovies}
        buttonMore={false}
      />
    </main>
  );
};

export default SavedMovies;
