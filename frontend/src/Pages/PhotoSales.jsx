import { useState } from 'react';
import styles from '../Styles/PhotoSales.module.css';

const photoSales = [
  {
    title: "Glamorous Red Carpet Look",
    description: "Captured during the 2024 Elite Fashion Show, this stunning red carpet moment features Model Andrea Rodríguez in an elegant, flowing gown. Perfect for any fashion enthusiast, this high-quality image highlights the essence of luxury and style.",
    priceDigital: "$50",
    pricePrint: "$100",
    categories: "Red Carpet, Fashion Show, Models",
    tags: "Andrea Rodríguez, Red Carpet, 2024 Fashion Show",
    formats: "JPEG, PNG",
    photographer: "Carlos Martínez"
  },
  {
    title: "Runway Stride",
    description: "Model Sofia Hernandez showcases the latest collection from Andrea Mesa’s fashion brand during the Spring/Summer Fashion Week. The perfect stride and vibrant attire make this image a must-have for runway lovers.",
    priceDigital: "$60",
    pricePrint: "$120",
    categories: "Runway, Fashion Week, Models",
    tags: "Sofia Hernandez, Fashion Week, Spring/Summer",
    formats: "JPEG, TIFF",
    photographer: "Javier Romero"
  },
  {
    title: "Urban Chic Style",
    description: "Captured in the streets of Paris, this photograph features Model Camila Morales in a casual urban outfit, combining streetwear with high-end fashion. This dynamic shot is perfect for urban fashion enthusiasts.",
    priceDigital: "$40",
    pricePrint: "$80",
    categories: "Urban Fashion, Street Style, Models",
    tags: "Camila Morales, Urban Fashion, Paris Shoot",
    formats: "JPEG, PDF",
    photographer: "Lucia González"
  },
  {
    title: "Backstage Moments",
    description: "A rare glimpse behind the scenes at Andrea Mesa's exclusive fashion show. Model Elena Garcia is seen getting ready with her makeup artist, bringing viewers closer to the preparation and creativity behind every look.",
    priceDigital: "$45",
    pricePrint: "$90",
    categories: "Backstage, Fashion Show, Models",
    tags: "Elena Garcia, Makeup, Backstage",
    formats: "JPEG, PNG",
    photographer: "Daniela Ruiz"
  },
  {
    title: "Golden Hour Glamour",
    description: "Set against the backdrop of a stunning sunset, Model Maria Torres glows in golden light, showcasing an exclusive evening gown from Andrea Mesa’s collection. This photograph is perfect for fans of glamorous, elegant imagery.",
    priceDigital: "$70",
    pricePrint: "$150",
    categories: "Glamour, Evening Wear, Models",
    tags: "Maria Torres, Golden Hour, Evening Gown",
    formats: "JPEG, TIFF",
    photographer: "Rodrigo Alvarez"
  },
  {
    title: "Exclusive Beach Photoshoot",
    description: "This photo captures the breathtaking beachside fashion shoot featuring Model Laura Ramirez. The image brings together beauty, elegance, and nature in one perfect shot, ideal for collectors of exotic photo sessions.",
    priceDigital: "$80",
    pricePrint: "$200",
    categories: "Beach Fashion, Outdoor, Models",
    tags: "Laura Ramirez, Beach Fashion, Nature",
    formats: "JPEG, PNG",
    photographer: "Sofia Mendez"
  }
];

function PhotoSales() {
  const [selectedFormat, setSelectedFormat] = useState({});

  const handleSelectFormat = (index, format) => {
    setSelectedFormat(prev => ({
      ...prev,
      [index]: format
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Photo Sales</h1>
      {photoSales.map((photo, index) => (
        <div key={index} className={styles.photoItem}>
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <p><strong>Price (Digital Download):</strong> {photo.priceDigital}</p>
          <p><strong>Price (Physical Print):</strong> {photo.pricePrint}</p>
          <p><strong>Categories:</strong> {photo.categories}</p>
          <p><strong>Tags:</strong> {photo.tags}</p>
          <p><strong>Available Formats:</strong> {photo.formats}</p>
          <p><strong>Photographer:</strong> {photo.photographer}</p>

          <div className={styles.formatSelect}>
            <p><strong>Select Format:</strong></p>
            <button
              className={`${styles.formatButton} ${selectedFormat[index] === 'digital' ? styles.selected : ''}`}
              onClick={() => handleSelectFormat(index, 'digital')}
            >
              Digital
            </button>
            <button
              className={`${styles.formatButton} ${selectedFormat[index] === 'print' ? styles.selected : ''}`}
              onClick={() => handleSelectFormat(index, 'print')}
            >
              Print
            </button>
          </div>

          <button className={styles.addButton}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default PhotoSales;
