import './MoviesCard.css';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { durationConverter } from '../../utils/durationConverter';
import { MOVIES_API_URL } from '../../utils/config';
import { api } from '../../utils/MainApi';
import { SaveContext } from '../App/App';

const MoviesCard = ({ card }) => {
  const { list, onChange } = useContext(SaveContext);
  const savedCard = list.find((item) => item.movieId === card.id);

  function handleFavoriteToogle() {
    if (savedCard) {
      handleRemove(savedCard?._id);
    } else {
      api.addNewCard(card).then(({ data }) => {
        onChange([...list, data]);
      });
    }
  }

  const handleRemove = (id) => {
    return api.deleteCard(id).then(() => {
      const updateList = list
        .filter((item) => item.movieId !== card.id)
        .filter((item) => item.movieId !== card.movieId);
      onChange(updateList);
    });
  };

  const { pathname } = useLocation();
  console.log(savedCard);
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
          src={
            typeof card?.image === 'string'
              ? card?.image
              : MOVIES_API_URL + card.image.url
          }
        />
      </a>
      <div className="card__element">
        <p className="card__title">{card.nameRU}</p>
        <div className="card__buttons">
          {pathname === '/saved-movies' ? (
            <button
              onClick={() => handleRemove(card._id)}
              type="button"
              className="card__button card__button_delete"
            />
          ) : (
            <button
              type="button"
              className={`card__button card__button${
                savedCard ? '_active' : '_inactive'
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
