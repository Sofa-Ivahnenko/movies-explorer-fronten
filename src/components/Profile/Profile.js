import './Profile.css';
import React, { useEffect, useState } from 'react';
import useFormFields from '../../hooks/useFormFields';

const Profile = (props) => {
  const { onEdit, currentUser, onLogout } = props;
  const { values, handleChange, errors, resetForm } = useFormFields();
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState('');
  const [isSuccesSave, setIsSuccesSave] = useState(false);

  const isNewDate =
    values?.name !== currentUser?.name || values?.email !== currentUser?.email;
  const isDisable =
    !values.name ||
    !values.email ||
    !!errors?.name ||
    !!errors?.email ||
    !isNewDate;

  const hanldeEdit = () => {
    onEdit(values)
      .then(() => {
        setIsEditMode(false);
        setError('');
        setIsSuccesSave(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (isSuccesSave) {
      setTimeout(() => {
        setIsSuccesSave(false);
      }, 4000);
    }
  }, [isSuccesSave]);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  return (
    <main className="profile">
      <section className="profile_container">
        <form className="profile__form">
          <h3 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h3>
          <div className="profile__inputs">
            <p className="profile__text">Имя</p>
            <div className="profile__area profile__area_type_name">
              <input
                className="profile__settings"
                placeholder="Виталий"
                minLength={2}
                maxLength={12}
                defaultValue={currentUser?.name || ''}
                value={values.name}
                name="name"
                onChange={handleChange}
                required
                disabled={!isEditMode}
              />
            </div>
            <div className="profile__area profile__area_type_email">
              <input
                className="profile__settings"
                placeholder="test@test.ru"
                name="email"
                required
                defaultValue={currentUser?.email || ''}
                onChange={handleChange}
                value={values.email}
                disabled={!isEditMode}
              />
            </div>
            <p className="profile__text">E-mail</p>
          </div>
        </form>
        <div className="profile__edit-controller">
          {isSuccesSave && (
            <div className="profile__success-message">Данные сохранены</div>
          )}
          {error && <p className="form__common-error">{error}</p>}
          {isEditMode ? (
            <>
              <button
                disabled={isDisable}
                onClick={(event) => {
                  event.preventDefault();
                  hanldeEdit();
                }}
                className="profile__submit-button"
              >
                Сохранить
              </button>
              <button
                className="profile__cancel-button"
                onClick={(event) => {
                  event.preventDefault();
                  setIsEditMode(false);
                }}
              >
                Отмена
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditMode(true);
                  setIsSuccesSave(false);
                }}
                className="profile__button"
              >
                Редактировать
              </button>
              <button
                onClick={onLogout}
                className="profile__link"
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
