// src/pages/ContactUs.jsx
import React from 'react';
import styles from '../styles/ContactUs.module.css';

function ContactUs() {
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="Name" />
        <input className={styles.input} type="email" placeholder="Email" />
        <textarea className={styles.textarea} placeholder="Message"></textarea>
        <button className={styles.button} type="submit">Send Message</button>
      </form>
      <div>
        <p>Contact us at: example@example.com</p>
        <p>Phone: +123456789</p>
        <p>Follow us on social media</p>
      </div>
    </div>
  );
}

export default ContactUs;
