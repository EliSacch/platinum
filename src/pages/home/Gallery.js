// images
import picOne from '../../assets/yellow.jpg';
import picTwo from '../../assets/cut.jpg';
import picThree from '../../assets/bride.jpg';
import picFour from '../../assets/wavy-hair.jpg';
import picFive from '../../assets/team.jpg';
// bootstrap
import { Carousel } from 'react-bootstrap';
// custom css
import styles from '../../styles/Gallery.module.css';


function Gallery() {

  return (
      <Carousel className={styles.Gallery} >
        <span id="gallery" className={`${styles.NavOffset} "d-none"`}></span>

        <Carousel.Item>
          <img src={picOne} alt='Blond hair'/>
        </Carousel.Item>

        <Carousel.Item>
          <img src={picTwo} alt='Male haircut'/>
        </Carousel.Item>

        <Carousel.Item>
          <img src={picThree} alt='Bride'/>
        </Carousel.Item>
                
        <Carousel.Item>
          <img src={picFour} alt='Wavy hair'/>
        </Carousel.Item>
                
        <Carousel.Item>
          <img src={picFive} alt='Team'/>
        </Carousel.Item>

      </Carousel>
  )
}

export default Gallery
