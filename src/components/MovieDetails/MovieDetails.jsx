import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/movies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            });

        if (user) {
            fetch(`http://localhost:5000/favorites?userEmail=${user.email}&movieId=${id}`)
                .then((res) => res.json())
                .then((favorites) => {
                    if (favorites.length > 0) {
                        setIsFavorite(true);
                    }
                });
        }

    }, [id, user]);


    const handleDeleteMovie = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" });

                    if (response.ok) {
                        Swal.fire("Deleted!", "The movie has been removed.", "success");
                        navigate("/all-movies");
                    } else {
                        toast.error("Failed to delete movie.");
                    }
                } catch (error) {
                    console.error("Error deleting movie:", error);
                    toast.error("Something went wrong.");
                }
            }
        });
    };

    const handleAddToFavorite = async () => {
        if (!user) return toast.error("You must be logged in to add to favorites.");

        try {
            const response = await fetch("http://localhost:5000/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: user.email,
                    movieId: id,
                    movieTitle: movie.movieTitle,
                    moviePoster: movie.moviePoster,
                    genre: movie.genre,
                    duration: movie.duration,
                    releaseYear: movie.releaseYear,
                    rating: movie.rating
                }),
            });

            if (response.ok) {
                setIsFavorite(true);
                toast.success("Movie added to favorites!");
            } else {
                toast.error("Failed to add to favorites.");
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
            toast.error("An error occurred.");
        }
    };


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

                <div className="text-center mt-4">
                    <Button variant="danger" size="lg" className="me-3" onClick={handleDeleteMovie}>
                        Delete Movie
                    </Button>
                    <Button
                        variant={isFavorite ? "success" : "warning"}
                        size="lg"
                        className="me-3"
                        onClick={handleAddToFavorite}
                        disabled={isFavorite}
                    >
                        {isFavorite ? "Marked as Favorite" : "Add to Favorite"}
                    </Button>
                    <Button variant="primary" size="lg" onClick={() => navigate("/all-movies")}>
                        See All Movies
                    </Button>
                </div>
            </Container>
        </div>
    );
};



export default MovieDetails;