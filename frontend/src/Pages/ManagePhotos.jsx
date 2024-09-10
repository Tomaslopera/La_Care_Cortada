import React, { useState } from 'react';
import styles from '../styles/ManagePhotos.module.css';

const initialPhotos = [
  { id: 1, title: 'Photo 1', price: '$10', image: 'photo1.jpg' },
  { id: 2, title: 'Photo 2', price: '$15', image: 'photo2.jpg' },
];

function ManagePhotos() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [editPhoto, setEditPhoto] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPhoto) {
      setPhotos(photos.map(photo =>
        photo.id === editPhoto.id ? { ...editPhoto, ...formData } : photo
      ));
    } else {
      setPhotos([...photos, { id: Date.now(), ...formData }]);
    }
    setFormData({ title: '', price: '', image: '' });
    setEditPhoto(null);
  };

  const handleEdit = (photo) => {
    setEditPhoto(photo);
    setFormData({
      title: photo.title,
      price: photo.price,
      image: photo.image,
    });
  };

  const handleDelete = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Manage Photos</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Photo Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Photo Title"
          />
        </label>
        <label className={styles.label}>
          Price
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            placeholder="Photo Price"
          />
        </label>
        <label className={styles.label}>
          Image URL
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={styles.input}
            placeholder="Photo Image URL"
          />
        </label>
        <button type="submit" className={styles.button}>
          {editPhoto ? 'Update Photo' : 'Add Photo'}
        </button>
      </form>
      <div className={styles.photosList}>
        {photos.map(photo => (
          <div key={photo.id} className={styles.photoItem}>
            <h2>{photo.title}</h2>
            <p><strong>Price:</strong> {photo.price}</p>
            <img src={photo.image} alt={photo.title} className={styles.image} />
            <button onClick={() => handleEdit(photo)} className={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(photo.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagePhotos;
