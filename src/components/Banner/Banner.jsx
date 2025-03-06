import { useEffect, useRef } from "react";
import { Carousel, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import gsap from "gsap";
import './Banner.css'

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
    image: "https://tmbroadcast.com/wp-content/uploads/blue-tv-User-Interface-TV-Tablet-Smartphone.jpg"
  },
  {
    title: "Exclusive Content",
    description: "Watch exclusive shows only on Noorflix.",
    buttonText: "Join Now",
    image: "https://tmbroadcast.com/wp-content/uploads/blue-tv-User-Interface-TV-Tablet-Smartphone.jpg"
  }
];

const Banner = () => {

    const titleRef = useRef([]);
    const descRef = useRef([]);
    const btnRef = useRef([]);
  
    useEffect(() => {
      slides.forEach((_, index) => {
        gsap.fromTo(
          titleRef.current[index],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.3 * index }
        );
        gsap.fromTo(
          descRef.current[index],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.5 * index }
        );
        gsap.fromTo(
          btnRef.current[index],
          { scale: 0 },
          { scale: 1, duration: 0.5, delay: 0.7 * index }
        );
      });
    }, []);
    
    
    return (
    
        <Carousel fade interval={5000} className="noorflix-carousel">
          {slides.map((slide, index) => (
            <Carousel.Item key={index} className="carousel-item">
              <img className="d-block w-100" src={slide.image} alt={slide.title} />
              <Carousel.Caption>
                <motion.h2
                  ref={(el) => (titleRef.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  ref={(el) => (descRef.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  ref={(el) => (btnRef.current[index] = el)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button variant="primary">{slide.buttonText}</Button>
                </motion.div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      
    );
};

export default Banner;