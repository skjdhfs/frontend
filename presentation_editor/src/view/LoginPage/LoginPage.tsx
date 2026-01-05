import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks/reduxHooks';
import { loginUser, registerUser } from '../../store/authThunks';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
    dispatch(registerUser({email, password}))
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <header className={styles.header}>
          <h1 className={styles.title}>Вход в редактор</h1>
          <p className={styles.subtitle}>Добро пожаловать!</p>
        </header>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="button" className={styles.loginButton} onClick={handleLogin}>
            Войти
          </button>
          <span>Нет аккаунта?</span>
          <button type="button" className={styles.loginButton} onClick={handleRegister}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
