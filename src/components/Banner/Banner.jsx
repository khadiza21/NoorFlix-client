import { Button } from "react-bootstrap";
import './Banner.css'
import Carousel from 'react-bootstrap/Carousel';
import banner from '../../assets/banner.jpg'

const slides = [
  {
    title: "Welcome to Noorflix",
    description: "Your ultimate destination for movies and TV shows.",
    buttonText: "Explore Now",
    image: "https://tmbroadcast.com/wp-content/uploads/blue-tv-User-Interface-TV-Tablet-Smartphone.jpg"
  },
  {
    title: "Unlimited Streaming",
    description: "Enjoy your favorite content anytime, anywhere.",
    buttonText: "Get Started",
    image: "https://static.vecteezy.com/system/resources/previews/002/236/321/non_2x/movie-trendy-banner-vector.jpg"
  },
  {
    title: "Exclusive Content",
    description: "Watch exclusive shows only on Noorflix.",
    buttonText: "Join Now",
    image: banner
  }
];


const Banner = () => {

  return (


    <Carousel  className="noorflix-carousel">
      {slides.map((slide, index) => (
        <Carousel.Item key={index} className="carousel-item">
          <img className="d-block w-100" src={slide.image} alt={slide.title} />
          <Carousel.Caption>
            <h2 className="banner-title">{slide.title}</h2>
            <p className="banner-desc">{slide.description}</p>
            <Button className="banner-btn">{slide.buttonText}</Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>

  );
};



export default Banner;