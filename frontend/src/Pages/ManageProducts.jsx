// src/pages/ManageProducts.jsx
import React, { useState } from 'react';
import styles from '../styles/ManageProducts.module.css';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditProduct(null);
  };

  return (
    <div className={styles.container}>
      <h1>Manage Products</h1>
      <div className={styles.formContainer}>
        <ProductForm 
          onAddProduct={handleAddProduct} 
          onUpdateProduct={handleUpdateProduct} 
          editProduct={editProduct} 
          setEditProduct={setEditProduct} 
        />
      </div>
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.images[0]} alt={product.name} className={styles.productImage} />
            <button onClick={() => setEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ onAddProduct, onUpdateProduct, editProduct, setEditProduct }) {
  const [name, setName] = useState(editProduct ? editProduct.name : '');
  const [description, setDescription] = useState(editProduct ? editProduct.description : '');
  const [price, setPrice] = useState(editProduct ? editProduct.price : '');
  const [images, setImages] = useState(editProduct ? editProduct.images : []);
  const [category, setCategory] = useState(editProduct ? editProduct.category : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { id: editProduct ? editProduct.id : Date.now(), name, description, price, images, category };
    if (editProduct) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }
    setName('');
    setDescription('');
    setPrice('');
    setImages([]);
    setCategory('');
    setEditProduct(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="text" placeholder="Image URLs (comma separated)" value={images} onChange={(e) => setImages(e.target.value.split(','))} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="lipsticks">Lipsticks</option>
        <option value="foundations">Foundations</option>
      </select>
      <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
      {editProduct && <button type="button" onClick={() => setEditProduct(null)}>Cancel</button>}
    </form>
  );
}

export default ManageProducts;
