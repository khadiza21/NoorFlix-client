import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";



const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => {
        const sortedMovies = data.sort((a, b) => b.rating - a.rating).slice(0, 6);
        setMovies(sortedMovies);
        gsap.from(".movie-card", { opacity: 0, y: 50, duration: 0.8, stagger: 0.2 });
      });
  }, []);

  return (
  <div className="bg-black py-5">
      <Container  className="my-5 py-5 text-white">
      <h2 className="text-center mb-4 text-danger pt-5 mt-5">Featured Movies</h2>
      <Row className="justify-content-center">
        {movies.map((movie) => (
          <Col key={movie._id} md={4} sm={6} className="mb-4 d-flex align-items-stretch">
            <motion.div whileHover={{ scale: 1.05 }} className="movie-card w-100">
              <Card className="shadow-lg border-0 rounded overflow-hidden h-100 d-flex flex-column">
                <div className="position-relative" style={{ height: "300px" }}>
                  <Card.Img
                    variant="top"
                    src={movie.moviePoster}
                    alt={movie.movieTitle}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">{movie.movieTitle}</Card.Title>
                  <Card.Text className="flex-grow-1 text-center">
                    <strong>Genre:</strong> {movie.genre.join(", ")}<br />
                    <strong>Duration:</strong> {movie.duration} min<br />
                    <strong>Release Year:</strong> {movie.releaseYear}<br />
                    <strong>Rating:</strong> ⭐ {movie.rating}
                  </Card.Text>
                  <div className="text-center">
                    <Button variant="danger" onClick={() => navigate(`/movies/${movie._id}`)}>
                      See Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="danger" size="lg" onClick={() => navigate("/all-movies")}>
          See All Movies
        </Button>
      </div>
    </Container>
  </div>
  );
};



export default FeaturedMovies;