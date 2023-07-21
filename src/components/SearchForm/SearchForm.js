import './SearchForm.css';

const SearchForm = () => {
	return (
		<form className="search">
			<div className="search__container">
				<input className="search__input" placeholder="Фильм" type="text" required />
				<button type="submit" className="search__button"></button>
				<div className="search__toggle">
					<label className="search__tumbler">
						<input type="checkbox" className="search__checkbox" placeholder="Чекбокс" />
						<span className="search__slider" />
					</label>
					<p className="search__films">Короткометражки</p>
				</div>
			</div>
			<div className="search__toggle search__toggle-update">
				<label className="search__tumbler">
					<input type="checkbox" className="search__checkbox" placeholder="Чекбокс" />
					<span className="search__slider" />
				</label>
				<p className="search__films">Короткометражки</p>
			</div>
		</form>
	);
};

export default SearchForm;
