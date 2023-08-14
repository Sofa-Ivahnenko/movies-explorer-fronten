import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useMemo, useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { searchMoviesByText } from '../../utils/searchMoviesByText';
import Preloader from '../Preloader/Preloader';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [filter, setFilter] = useState(() => {
    const savedFilter = window.localStorage.getItem('filter');
    const result = JSON.parse(savedFilter);
    return (
      result || {
        searchText: '',
        isShortMovies: false,
      }
    );
  });

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getAllMovies()
      .then((data) => {
        setMovies(data);
      })
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    handleSearch(filter);
  }, [movies]);

  useEffect(() => {
    handleSearch(filter);
  }, [filter.isShortMovies]);

  useEffect(() => {
    window.localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);

  const isSearchMode = useMemo(() => {
    return !!filter.searchText || filter.isShortMovies;
  }, [filter]);

  const handleSearch = () => {
    const result = searchMoviesByText(movies, filter.searchText).filter(
      (movie) => (filter.isShortMovies ? movie.duration < 40 : true)
    );
    setFilterMovies(result);
  };

  return (
    <main className="movies">
      <SearchForm
        filter={filter}
        onChangeFilter={setFilter}
        onSearch={handleSearch}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          cards={filterMovies}
          // isCanLoadMore={!isSearchMode}
        />
      )}
    </main>
  );
}

export default Movies;
