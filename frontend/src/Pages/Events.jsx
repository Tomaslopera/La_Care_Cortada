// src/pages/Events.jsx
import React from 'react';
import styles from '../styles/Events.module.css';

// Sample data
const events = [
  { name: 'Event 1', date: '01/01/2024', location: 'City Hall', models: 'Model 1, Model 2', products: 'Product 1, Product 2' },
  { name: 'Event 2', date: '02/01/2024', location: 'Expo Center', models: 'Model 3, Model 4', products: 'Product 3, Product 4' }
];

function Events() {
  return (
    <div className={styles.container}>
      <h1>Fashion Events</h1>
      <div className={styles.eventList}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <h2 className={styles.eventName}>{event.name}</h2>
            <p className={styles.eventDetails}>Date: {event.date}<br />Location: {event.location}<br />Models: {event.models}<br />Products: {event.products}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;


