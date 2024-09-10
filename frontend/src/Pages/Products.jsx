import  { useState } from 'react';
import styles from '../styles/Products.module.css';

const products = [
  { name: 'Maybelline SuperStay Matte Ink', description: 'Long-lasting liquid lipstick with a matte finish.', price: '$20', image: '../assets/products/superstay-matte-ink.webp', category: 'Lipsticks' },
  { name: 'Fenty Beauty Pro Filt\'r Soft Matte Foundation', description: 'A long-wear foundation with buildable coverage and a matte finish.', price: '$35', image: '../assets/products/fenty-pro-filtr-foundation.png', category: 'Foundations' },
  { name: 'Urban Decay Naked Heat Palette', description: 'A warm-toned eyeshadow palette with 12 sultry shades.', price: '$54', image: '../assets/products/naked-heat-palette.jpg', category: 'Eye Shadows' },
  { name: 'NARS Radiant Creamy Concealer', description: 'Award-winning concealer with radiant coverage.', price: '$30', image: 'nars-creamy-concealer.jpg', category: 'Concealers' },
  { name: 'MAC Satin Lipstick - Ruby Woo', description: 'Iconic vivid red lipstick with a satin finish.', price: '$19', image: 'mac-ruby-woo.jpg', category: 'Lipsticks' },
  { name: 'Tarte Shape Tape Concealer', description: 'Full-coverage concealer for a flawless look.', price: '$27', image: 'tarte-shape-tape.jpg', category: 'Concealers' },
  { name: 'Charlotte Tilbury Airbrush Flawless Foundation', description: 'Full-coverage foundation with a flawless finish.', price: '$44', image: 'airbrush-flawless-foundation.jpg', category: 'Foundations' },
  { name: 'Anastasia Beverly Hills Brow Wiz', description: 'Ultra-slim brow pencil for precise detailing.', price: '$23', image: 'brow-wiz.jpg', category: 'Brows' },
  { name: 'Benefit Cosmetics Hoola Bronzer', description: 'Award-winning matte bronzer for natural-looking tan.', price: '$30', image: 'hoola-bronzer.jpg', category: 'Bronzers' },
  { name: 'Dior Addict Lip Glow', description: 'Color-enhancing lip balm with hydrating finish.', price: '$34', image: 'dior-lip-glow.jpg', category: 'Lipsticks' },
  { name: 'Laura Mercier Translucent Loose Setting Powder', description: 'Iconic translucent powder to set makeup for a flawless finish.', price: '$39', image: 'laura-mercier-powder.jpg', category: 'Powders' },
  { name: 'Too Faced Better Than Sex Mascara', description: 'Volumizing mascara for full, dramatic lashes.', price: '$27', image: 'better-than-sex-mascara.jpg', category: 'FOundations' },
  { name: 'Huda Beauty Nude Obsessions Eyeshadow Palette', description: 'Compact eyeshadow palette with nude tones.', price: '$29', image: 'huda-nude-palette.jpg', category: 'Eye Shadows' },
  { name: 'Smashbox Photo Finish Foundation Primer', description: 'A lightweight primer that smooths skin for flawless makeup application.', price: '$36', image: 'smashbox-primer.jpg', category: 'Powders' },
  { name: 'Lancôme Teint Idole Ultra Wear Foundation', description: 'Full-coverage foundation with a natural matte finish.', price: '$47', image: 'lancome-teint-idole.jpg', category: 'Foundations' }
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