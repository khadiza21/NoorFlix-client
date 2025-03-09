import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useTheme } from "../theme/Theme";


const FavoriteMovies = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isDarkMode } = useTheme();


    useEffect(() => {
        if (user) {
            fetch(`https://noorflix-s.vercel.app/favorites/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setFavorites(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching favorites:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleRemoveFavorite = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this movie!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
        try {
            const response = await fetch(`https://noorflix-s.vercel.app/favorites/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setFavorites(favorites.filter((movie) => movie._id !== id));
                Swal.fire("Deleted!", "The movie has been removed from your favorites.", "success");
              //  toast.success("Removed from favorites.");
            } else {
                toast.error("Failed to remove movie.");
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
            toast.error("An error occurred.");
        }
    };
    };

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

    return (
        <Container className="py-5 text-white " >
            <h2  className={`mb-4 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>My Favorite Movies 🎬</h2>
            {favorites.length === 0 ? (
                <p className="text-center text-muted">No favorite movies found.</p>
            ) : (
                <Row className="g-4">
                {favorites.map((movie) => (
                    <Col key={movie._id} md={4} sm={6} xs={12}>
                        <Card className="bg-dark text-white h-100">
                            <Card.Img variant="top" src={movie.moviePoster} alt={movie.movieTitle} style={{ height: "250px" }} />
                            <Card.Body>
                                <Card.Title>{movie.movieTitle}</Card.Title>
                                <Card.Text>
                                    <strong>Genre:</strong> {movie.genre.join(", ")} <br />
                                    <strong>Duration:</strong> {movie.duration} min <br />
                                    <strong>Release Year:</strong> {movie.releaseYear} <br />
                                    <strong>Rating:</strong> ⭐ {movie.rating}
                                </Card.Text>
                                <Button variant="danger" onClick={() => handleRemoveFavorite(movie._id)}>
                                    Delete Favorite
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            )}
        </Container>
    );
};

export default FavoriteMovies;
