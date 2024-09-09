// src/pages/Products.jsx
import React, { useState } from 'react';
import styles from '../styles/Products.module.css';

// Sample data with categories
const products = [
  { name: 'Product 1', description: 'Description of Product 1', price: '$20', image: 'product1.jpg', category: 'Lipsticks' },
  { name: 'Product 2', description: 'Description of Product 2', price: '$30', image: 'product2.jpg', category: 'Foundations' },
  { name: 'Product 3', description: 'Description of Product 1', price: '$20', image: 'product1.jpg', category: 'Lipsticks' },
  { name: 'Product 4', description: 'Description of Product 2', price: '$30', image: 'product2.jpg', category: 'Foundations' }
];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className={styles.container}>
      <h1>Makeup Products</h1>
      <div className={styles.filter}>
        <label htmlFor="category-filter">Filter by category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.filterSelect}
        >
          <option value="All">All</option>
          <option value="Lipsticks">Lipsticks</option>
          <option value="Foundations">Foundations</option>
        </select>
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <img className={styles.productImage} src={product.image} alt={product.name} />
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

