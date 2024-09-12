// src/pages/Models.jsx
import React from 'react';
import styles from '../Styles/Models.module.css';
import model1 from '../Photos/Modelos/model1.jpg';
import model2 from '../Photos/Modelos/model2.jpg';
import model3 from '../Photos/Modelos/model3.jpg';
// Sample data
const models = [
  { name: 'Jenn Lewandofss', photo: model1 , portfolioLink: '#' },
  { name: 'Karolina Hemps', photo: model2, portfolioLink: '#' }, 
  { name: 'Catherine Ruth', photo: model3, portfolioLink: '#' },
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
