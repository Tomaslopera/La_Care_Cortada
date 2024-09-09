// src/pages/ManagePhotos.jsx
import React, { useState } from 'react';
import styles from '../styles/ManagePhotos.module.css';

function ManagePhotos() {
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = (photo) => {
    setPhotos([...photos, photo]);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  return (
    <div className={styles.container}>
      <h1>Manage Photos</h1>
      <div className={styles.formContainer}>
        {/* Add photo form here */}
        <PhotoForm onAddPhoto={handleAddPhoto} />
      </div>
      <div className={styles.photoList}>
        {photos.map(photo => (
          <div key={photo.id} className={styles.photoCard}>
            <img src={photo.url} alt={photo.description} className={styles.photoImage} />
            <p>{photo.description}</p>
            <p>Price: ${photo.price}</p>
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoForm({ onAddPhoto }) {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPhoto = { id: Date.now(), url, description, price };
    onAddPhoto(newPhoto);
    setUrl('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" placeholder="Photo URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit">Add Photo</button>
    </form>
  );
}

export default ManagePhotos;
