import React, { useState } from 'react';
import styles from '../Styles/ManageEvents.module.css';

const initialEvents = [
  { id: 1, name: 'Event 1', date: '01/01/2024', location: 'City Hall', models: 'Model 1, Model 2', products: 'Product 1, Product 2' },
  { id: 2, name: 'Event 2', date: '02/01/2024', location: 'Expo Center', models: 'Model 3, Model 4', products: 'Product 3, Product 4' },
];

function ManageEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    models: '',
    products: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEvent) {
      setEvents(events.map(event =>
        event.id === editEvent.id ? { ...editEvent, ...formData } : event
      ));
    } else {
      setEvents([...events, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: '', date: '', location: '', models: '', products: '' });
    setEditEvent(null);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      location: event.location,
      models: event.models,
      products: event.products,
    });
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Manage Events</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Event Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Event Name"
          />
        </label>
        <label className={styles.label}>
          Date
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
            placeholder="Event Date"
          />
        </label>
        <label className={styles.label}>
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            placeholder="Event Location"
          />
        </label>
        <label className={styles.label}>
          Models
          <input
            type="text"
            name="models"
            value={formData.models}
            onChange={handleChange}
            className={styles.input}
            placeholder="Event Models"
          />
        </label>
        <label className={styles.label}>
          Products
          <input
            type="text"
            name="products"
            value={formData.products}
            onChange={handleChange}
            className={styles.input}
            placeholder="Event Products"
          />
        </label>
        <button type="submit" className={styles.button}>
          {editEvent ? 'Update Event' : 'Add Event'}
        </button>
      </form>
      <div className={styles.eventsList}>
        {events.map(event => (
          <div key={event.id} className={styles.eventItem}>
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Models:</strong> {event.models}</p>
            <p><strong>Products:</strong> {event.products}</p>
            <button onClick={() => handleEdit(event)} className={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(event.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageEvents;
