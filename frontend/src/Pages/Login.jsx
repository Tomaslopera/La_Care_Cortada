// src/pages/Login.jsx
import React from 'react';
import styles from '../styles/Auth.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form}>
        <input className={styles.input} type="email" placeholder="Email" />
        <input className={styles.input} type="password" placeholder="Password" />
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
