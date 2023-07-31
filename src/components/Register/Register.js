import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import useFormFields from '../../hooks/useFormFields';
import Form from '../Form/Form';

function Register(props) {
  const { onRegister } = props;
  const { values, handleChange, errors } = useFormFields();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isDisable =
    !values.name ||
    !values.email ||
    !values.password ||
    !!errors?.name ||
    !!errors?.email ||
    !!errors?.password;

  const handleSubmit = () => {
    onRegister(values)
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  return (
    <main className="register">
      <Form
        header="Добро пожаловать!"
        submit="Зарегистрироваться"
        question="Уже зарегистрированы?"
        link="Войти"
        path="/signin"
        onSubmit={handleSubmit}
        isDisable={isDisable}
      >
        <div className="form__item">
          <p className="form__item-text">Имя</p>
          <input
            type="text"
            className="form__field"
            placeholder="Виталий"
            minLength={2}
            maxLength={12}
            required
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && (
            <p className="form__error">
              {errors.name || 'Что-то пошло не так...'}
            </p>
          )}
        </div>

        <div className="form__item">
          <p className="form__item-text">E-mail</p>
          <input
            type="email"
            className="form__field"
            placeholder="test@test.ru"
            name="email"
            required
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && (
            <p className="form__error">
              {errors.email || 'Что-то пошло не так...'}
            </p>
          )}
        </div>
        <div className="form__item">
          <p className="form__item-text">Пароль</p>
          <input
            type="password"
            className={`form__field ${
              errors.password ? 'form__field_color-error' : ''
            }`}
            minLength={3}
            maxLength={25}
            placeholder="••••••••••••••"
            required
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && (
            <p className="form__error">
              {errors.password || 'Что-то пошло не так...'}
            </p>
          )}
        </div>
        {error && <p className="form__common-error">{error}</p>}
      </Form>
    </main>
  );
}

export default Register;
