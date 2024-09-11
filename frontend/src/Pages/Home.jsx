import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/Home.module.css';

const featuredModels = ['Model 1', 'Model 2'];
const featuredProducts = ['Product 1', 'Product 2'];
const upcomingEvents = ['Event 1', 'Event 2'];


const images = [
  { src: "image1.jpg", alt: "Image 1" },
  { src: "image2.jpg", alt: "Image 2" },
  { src: "image3.jpg", alt: "Image 3" }
];

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
  
    <div className={styles.container}>
      <Slider {...settings} className={styles.carousel}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} className={styles.carouselImage} />
          </div>
        ))}
      </Slider>
      <h1 className={styles.welcomeMessage}>Welcome to La Care Cortada's Empire</h1>
      
      <p className={styles.welcomeParagraph}>
        Step into the bold and glamorous world of Andrea Mesa, better known as La Care Cortada. As a dominant figure in the makeup and fashion industry, she invites you to explore her empire, where beauty meets ambition. From managing top-tier models to hosting exclusive fashion events. Andrea’s brand offers more than just makeup—it’s a lifestyle, one that transcends the ordinary.
      </p>

      <p className={styles.welcomeParagraph}>
        Discover our premium makeup line, browse the latest fashion events, and meet the talented models who bring our brand to life. Whether you’re here for beauty tips, exclusive products, or just to admire the artistry of fashion, La Care Cortada has something for everyone.
      </p>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Models</h2>
        {featuredModels.map((model, index) => (
          <div key={index} className={styles.featuredItem}>{model}</div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Makeup Products</h2>
        {featuredProducts.map((product, index) => (
          <div key={index} className={styles.featuredItem}>{product}</div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        {upcomingEvents.map((event, index) => (
          <div key={index} className={styles.featuredItem}>{event}</div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About the Brand</h2>
        <p className={styles.welcomeParagraph}>
          Founded by the infamous Andrea Mesa, La Care Cortada is not your average makeup brand. It represents the fierce, the rebellious, and those unafraid to make a statement. Andrea’s journey from the streets to stardom has shaped the brand’s unique identity, blending luxury makeup with an edgy, underground vibe.
        </p>
      </section>
    </div>
    
  );
}

export default Home;
