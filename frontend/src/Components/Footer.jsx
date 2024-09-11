
import styles from '../Styles/Footer.module.css';


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <h3>About Us</h3>
        <p>Our brand manages an elite roster of models who are the face of La Care Cortada across the globe, dominating fashion events, campaigns, and social media. We offer a full range of makeup products that speak to the individuality and boldness of our customers.</p>
      </div>
      <div className={styles.footerRight}>
        <h3>Contact Us</h3>
        <p>contact@lacarecortada.com</p>
        <p>+1 (800) 555-1234</p>
        <p>123 Main St, New York, NY 10001</p>
      </div>
    </footer>
  );
}

export default Footer;
