import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { durationConverter } from '../../utils/durationConverter';
import { MOVIES_API_URL } from '../../utils/config';

const MoviesCard = ({ card }) => {
  const [favorite, setFavorite] = React.useState(false);

  function handleFavoriteToogle() {
    setFavorite(!favorite);
  }

  const { pathname } = useLocation();

  return (
    <li className="card">
      <a
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt={card.nameRU}
          src={MOVIES_API_URL + card.image.url}
        />
      </a>
      <div className="card__element">
        <p className="card__title">{card.nameRU}</p>
        <div className="card__buttons">
          {pathname === '/saved-movies' ? (
            <button
              type="button"
              className="card__button card__button_delete"
            />
          ) : (
            <button
              type="button"
              className={`card__button card__button${
                favorite ? '_active' : '_inactive'
              }`}
              onClick={handleFavoriteToogle}
            />
          )}
        </div>
      </div>
      <p className="card__duration">{durationConverter(card.duration)}</p>
    </li>
  );
};

export default MoviesCard;
