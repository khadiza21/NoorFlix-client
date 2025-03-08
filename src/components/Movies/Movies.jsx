import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import './Movies.css'

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); 
    const moviesPerPage = 6;
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:5000/movies")
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
          gsap.from(".movie-card", { opacity: 0, y: 50, duration: 0.8, stagger: 0.2 });
        });
    }, []);

  
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies
    .filter((movie) =>
      movie.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(movies.filter((movie) =>
      movie.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) 
    ).length / moviesPerPage);
  
    return (
      <div className="bg-black py-5 ">
        <Container className="text-white">

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by movie title..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
          
          <Row className="justify-content-center">
            {currentMovies.map((movie) => (
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
       
      
          <div className="text-center mt-4 d-flex align-items-center justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            className="prevBtn"
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                  className="item"
                  style={{
                    color: 'red',
                    backgroundColor: index + 1 === currentPage ? 'red' : 'transparent',
                    borderColor: 'red'
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
             className="nextBtn"
              />
            </Pagination>
          </div>
        </Container>
      </div>
    );
};



export default Movies;