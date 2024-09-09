// src/pages/PhotoSales.jsx
import React from 'react';
import styles from '../styles/PhotoSales.module.css';

// Sample data
const photos = [
  { title: 'Photo 1', price: '$10', image: 'photo1.jpg' },
  { title: 'Photo 2', price: '$15', image: 'photo2.jpg' },
  { title: 'Photo 3', price: '$10', image: 'photo1.jpg' },
  { title: 'Photo 4', price: '$15', image: 'photo2.jpg' },
  { title: 'Photo 5', price: '$10', image: 'photo1.jpg' },
  { title: 'Photo 6', price: '$15', image: 'photo2.jpg' },
  { title: 'Photo 7', price: '$10', image: 'photo1.jpg' },
  { title: 'Photo 8', price: '$15', image: 'photo2.jpg' }
];

function PhotoSales() {
  return (
    <div className={styles.container}>
      <h1>Photo Sales</h1>
      <div className={styles.photoList}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.photoCard}>
            <img className={styles.photoImage} src={photo.image} alt={photo.title} />
            <h2 className={styles.photoTitle}>{photo.title}</h2>
            <p className={styles.photoPrice}>{photo.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoSales;
