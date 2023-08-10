import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { searchMoviesByText } from '../../utils/searchMoviesByText';

const SavedMovies = (props) => {
  const { movies = [] } = props;
  const [filterMovies, setFilterMovies] = useState(movies);
  const [filter, setFilter] = useState({
    searchText: '',
    isShortMovies: false,
  });

  useEffect(() => {
    handleSearch(filter);
  }, [movies]);

  useEffect(() => {
    handleSearch(filter);
  }, [filter.isShortMovies]);

  const handleSearch = () => {
    const result = searchMoviesByText(movies, filter.searchText).filter(
      (movie) => (filter.isShortMovies ? movie.duration < 40 : true)
    );
    setFilterMovies(result);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        filter={filter}
        onChangeFilter={setFilter}
        onSearch={handleSearch}
      />
      <MoviesCardList
        cards={filterMovies}
        buttonMore={false}
      />
    </main>
  );
};

export default SavedMovies;
