import  { useState } from 'react';
import styles from '../Styles/Products.module.css';
import superstayMatteInk from '../Photos/products/superstay-matte-ink.webp';
import fentyProFiltrFoundation from '../Photos/products/fenty-pro-filtr-foundation.png';
import nakedHeatPalette from '../Photos/products/naked-heat-palette.jpg';
import narsCreamyConcealer from '../Photos/products/nars-creamy-concealer.jpg'
import macRubyWoo from '../Photos/products/mac-ruby-woo.avif'
import tarteShapeTape from '../Photos/products/tarte-shape-tape.webp'
import airbrushFlawlessFoundation from '../Photos/products/airbrush-flawless-foundation.avif'
import browWiz from '../Photos/products/brow-wiz.webp'

const products = [
  { name: 'Maybelline SuperStay Matte Ink', description: 'Long-lasting liquid lipstick with a matte finish.', price: '$20', image: superstayMatteInk, category: 'Lipsticks' },
  { name: 'Fenty Beauty Pro Filt\'r Soft Matte Foundation', description: 'A long-wear foundation with buildable coverage and a matte finish.', price: '$35', image: fentyProFiltrFoundation, category: 'Foundations' },
  { name: 'Urban Decay Naked Heat Palette', description: 'A warm-toned eyeshadow palette with 12 sultry shades.', price: '$54', image: nakedHeatPalette, category: 'Eye Shadows' },
  { name: 'NARS Radiant Creamy Concealer', description: 'Award-winning concealer with radiant coverage.', price: '$30', image: narsCreamyConcealer, category: 'Concealers' },
  { name: 'MAC Satin Lipstick - Ruby Woo', description: 'Iconic vivid red lipstick with a satin finish.', price: '$19', image: macRubyWoo, category: 'Lipsticks' },
  { name: 'Tarte Shape Tape Concealer', description: 'Full-coverage concealer for a flawless look.', price: '$27', image: tarteShapeTape, category: 'Concealers' },
  { name: 'Charlotte Tilbury Airbrush Flawless Foundation', description: 'Full-coverage foundation with a flawless finish.', price: '$44', image: airbrushFlawlessFoundation, category: 'Foundations' },
  { name: 'Anastasia Beverly Hills Brow Wiz', description: 'Ultra-slim brow pencil for precise detailing.', price: '$23', image: browWiz, category: 'Brows' },
]


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
          <option value="Eye Shadows">Eye Shadows</option>
          <option value="Powders">Powders</option>
          <option value="Bronzers">Bronzers</option>
          <option value="Brows">Brows</option>
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