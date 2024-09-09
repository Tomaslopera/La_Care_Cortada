// src/pages/Models.jsx
import React from 'react';
import styles from '../styles/Models.module.css';

// Sample data
const models = [
  { name: 'Model 1', photo: 'model1.jpg', portfolioLink: '#' },
  { name: 'Model 2', photo: 'model2.jpg', portfolioLink: '#' }, 
  { name: 'Model 3', photo: 'model1.jpg', portfolioLink: '#' },
  { name: 'Model 4', photo: 'model2.jpg', portfolioLink: '#' }, 
  { name: 'Model 5', photo: 'model1.jpg', portfolioLink: '#' },
  { name: 'Model 6', photo: 'model2.jpg', portfolioLink: '#' }, 
  { name: 'Model 7', photo: 'model1.jpg', portfolioLink: '#' },
  { name: 'Model 8', photo: 'model2.jpg', portfolioLink: '#' }
];

function Models() {
  return (
    <div className={styles.container}>
      <h1>Model Directory</h1>
      <div className={styles.modelList}>
        {models.map((model, index) => (
          <div key={index} className={styles.modelCard}>
            <img className={styles.modelPhoto} src={model.photo} alt={model.name} />
            <h2 className={styles.modelName}>{model.name}</h2>
            <a className={styles.portfolioButton} href={model.portfolioLink}>View Portfolio</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Models;
