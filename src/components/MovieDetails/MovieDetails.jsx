import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/movies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

    return (
        <div className="bg-black">

            <Container className="py-5 text-white">
                <Card className="bg-dark text-white shadow-lg p-3">
                    <Card.Img src={movie.moviePoster} alt={movie.movieTitle} className="w-100" style={{ height: '500px' }} />
                    <Card.Body>
                        <Card.Title className="text-center">{movie.movieTitle}</Card.Title>
                        <Card.Text>
                            <strong>Genre:</strong> {movie.genre.join(" , ")} <br />
                            <strong>Duration:</strong> {movie.duration} min <br />
                            <strong>Release Year:</strong> {movie.releaseYear} <br />
                            <strong>Rating:</strong> ⭐ {movie.rating} <br />
                            <strong>Summary:</strong> {movie.summary}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};



export default MovieDetails;