import { useState } from 'react';
import useFormFields from '../../hooks/useFormFields';
import Form from '../Form/Form';

function Login(props) {
  const { onLogin } = props;
  const { values, handleChange, errors } = useFormFields();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isDisable =
    !values.email || !values.password || !!errors?.email || !!errors?.password;

  const handleSubmit = async () => {
    setIsLoading(true);
    onLogin(values)
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="login">
      <Form
        header="Рады видеть!"
        submit="Войти"
        question="Ещё не зарегистрированы?"
        link="Регистрация"
        path="/signup"
        onSubmit={handleSubmit}
        isDisable={isDisable}
      >
        <div className="form__item">
          <p className="form__item-text">E-mail</p>
          <input
            disabled={isLoading}
            type="email"
            className="form__field"
            // defaultValue="test@test.ru"
            placeholder="test@test.ru"
            required
            name="email"
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
            disabled={isLoading}
            type="password"
            className={`form__field ${
              errors.password ? 'form__field_color-error' : ''
            }`}
            minLength={3}
            maxLength={25}
            placeholder="пароль"
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

export default Login;
