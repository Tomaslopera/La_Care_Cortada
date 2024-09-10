import  { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Menu.module.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : ''}`}>
      <div className={styles.menuToggle} onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={styles.navList}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/models" className={styles.navLink}>Models</Link></li>
        <li><Link to="/products" className={styles.navLink}>Products</Link></li>
        <li><Link to="/events" className={styles.navLink}>Events</Link></li>
        <li><Link to="/photos" className={styles.navLink}>Photo Sales</Link></li>
        <li><Link to="/memberships" className={styles.navLink}>Memberships</Link></li>
        <li><Link to="/admin" className={styles.navLink}>Admin Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;