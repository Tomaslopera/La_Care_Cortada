// src/pages/Memberships.jsx
import React from 'react';
import styles from '../styles/Memberships.module.css';

function Memberships() {
  return (
    <div className={styles.container}>
      <h1>Exclusive Memberships</h1>
      
      <div className={styles.membershipInfo}>
        {/* Información sobre las membresías */}
        <div className={styles.membershipTier}>
          <h2>Basic Membership</h2>
          <p>Access to basic content and discounts.</p>
        </div>
        <div className={styles.membershipTier}>
          <h2>Premium Membership</h2>
          <p>Includes all basic benefits plus premium content.</p>
        </div>
        <div className={styles.membershipTier}>
          <h2>Elite Membership</h2>
          <p>All premium benefits plus exclusive access and discounts.</p>
        </div>
      </div>
      
      <div className={styles.activitiesContainer}>
        {/* Actividades no legales */}
        <div className={styles.activityCircle}>Activity 1</div>
        <div className={styles.activityCircle}>Activity 2</div>
        <div className={styles.activityCircle}>Activity 3</div>
      </div>
      
      <div className={styles.registrationSection}>
        <form className={styles.form}>
          <input className={styles.input} type="text" placeholder="Name" />
          <input className={styles.input} type="email" placeholder="Email" />
          <input className={styles.input} type="password" placeholder="Password" />
          <button className={styles.button} type="submit">Sign Up</button>
        </form>
      </div>

      {/* <div className={styles.buttonsContainer}>
        <Link className={styles.linkButton} to="/login">Login</Link>
        <Link className={styles.linkButton} to="/register">Register</Link>
      </div> */}
    </div>
  );
}

export default Memberships;