import React, { useState } from 'react';
import styles from '../styles/ManageModels.module.css';

const initialModels = [
  { id: 1, name: 'Model A', photos: 'http://example.com/photo1.jpg', portfolio: 'http://example.com/portfolio1', bookingInfo: 'Booking info A' },
  { id: 2, name: 'Model B', photos: 'http://example.com/photo2.jpg', portfolio: 'http://example.com/portfolio2', bookingInfo: 'Booking info B' },
];

function ManageModels() {
  const [models, setModels] = useState(initialModels);
  const [editModel, setEditModel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photos: '',
    portfolio: '',
    bookingInfo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editModel) {
      setModels(models.map(model =>
        model.id === editModel.id ? { ...editModel, ...formData } : model
      ));
    } else {
      setModels([...models, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: '', photos: '', portfolio: '', bookingInfo: '' });
    setEditModel(null);
  };

  const handleEdit = (model) => {
    setEditModel(model);
    setFormData({
      name: model.name,
      photos: model.photos,
      portfolio: model.portfolio,
      bookingInfo: model.bookingInfo,
    });
  };

  const handleDelete = (id) => {
    setModels(models.filter(model => model.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Manage Models</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder='Name'
          />
        </label>
        <label className={styles.label}>
          Photos URL:
          <input
            type="text"
            name="photos"
            value={formData.photos}
            onChange={handleChange}
            className={styles.input}
            placeholder='Photos URL'
          />
        </label>
        <label className={styles.label}>
          Portfolio URL:
          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className={styles.input}
            placeholder='Portfolio URL'
          />
        </label>
        <label className={styles.label}>
          Booking Information:
          <textarea
            name="bookingInfo"
            value={formData.bookingInfo}
            onChange={handleChange}
            className={styles.textarea}
            placeholder='Booking Information'
          />
        </label>
        <button type="submit" className={styles.button}>
          {editModel ? 'Update Model' : 'Add Model'}
        </button>
      </form>
      <div className={styles.modelsList}>
        {models.map(model => (
          <div key={model.id} className={styles.modelItem}>
            <h2>{model.name}</h2>
            <p><strong>Photos URL:</strong> {model.photos}</p>
            <p><strong>Portfolio URL:</strong> {model.portfolio}</p>
            <p><strong>Booking Information:</strong> {model.bookingInfo}</p>
            <button onClick={() => handleEdit(model)} className={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(model.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageModels;

