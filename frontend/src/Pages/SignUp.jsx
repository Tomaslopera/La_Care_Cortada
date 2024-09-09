// src/pages/Register.jsx
import React from 'react';
import styles from '../styles/Auth.module.css';

function Register() {
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="Name" />
        <input className={styles.input} type="email" placeholder="Email" />
        <input className={styles.input} type="password" placeholder="Password" />
        <button className={styles.button} type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
