import './SearchForm.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SearchForm = () => {
	const { pathname } = useLocation();
	return (
		<form className={`search ${pathname !== '/movies' ? '/saved-movies' : 'search_saved'}`}>
			<div className="search__container">
				<input className="search__input" placeholder="Фильм" type="text" required />
				<button type="submit" className="search__button"></button>
				<div className="search__toggle">
					<label className="search__tumbler">
						<input type="checkbox" placeholder="чекбокс" className="search__checkbox" />
						<span className="search__slider" />
					</label>
					<p className="search__films">Короткометражки</p>
				</div>
			</div>
			<div className="search__toggle search__toggle-update">
				<label className="search__tumbler">
					<input type="checkbox" placeholder="чекбокс"  className="search__checkbox" />
					<span className="search__slider" />
				</label>
				<p className="search__films">Короткометражки</p>
			</div>
		</form>
	);
};

export default SearchForm;
