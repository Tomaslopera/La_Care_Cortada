import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colores from "../Styles/colores";
import styles from '../Styles/Footer.module.css';


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <h3>Información</h3>
        <p>Este sitio ofrece los mejores productos y eventos de modelos. Síguenos en nuestras redes sociales.</p>
      </div>
      <div className={styles.footerRight}>
        <h3>Contact Us</h3>
        <p>Email: info@example.com</p>
        <p>Teléfono: +123 456 7890</p>
      </div>
    </footer>
  );
}

export default Footer;
