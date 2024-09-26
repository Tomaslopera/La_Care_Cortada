import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Auth.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form}>
        <input type="text" className={styles.input} placeholder="Username" />
        <input type="password" className={styles.input} placeholder="Password" />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link></p>
    </div>
  );
}

export default Login;

