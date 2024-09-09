// src/pages/Home.jsx
import React from 'react';
import styles from '../styles/Home.module.css';

// Sample data
const featuredModels = ['Model 1', 'Model 2'];
const featuredProducts = ['Product 1', 'Product 2'];
const upcomingEvents = ['Event 1', 'Event 2'];

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeMessage}>Welcome to La Care Cortada's Empire</h1>
      <p>A welcome message from Andrea Mesa.</p>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Models</h2>
        {featuredModels.map((model, index) => (
          <div key={index} className={styles.featuredItem}>{model}</div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Makeup Products</h2>
        {featuredProducts.map((product, index) => (
          <div key={index} className={styles.featuredItem}>{product}</div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        {upcomingEvents.map((event, index) => (
          <div key={index} className={styles.featuredItem}>{event}</div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About the Brand</h2>
        <p>Brief overview of the brand and its values...</p>
      </section>
    </div>
  );
}

export default Home;
