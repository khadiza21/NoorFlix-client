import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const UpdateMovie = () => {
    const { id } = useParams(); // Get movie ID from URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Get user data

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(true);

    // Fetch movie data by ID and set default values
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movies/${id}`);
                const movie = await response.json();

                if (response.ok) {
                    // Set form default values
                    setValue("moviePoster", movie.moviePoster);
                    setValue("movieTitle", movie.movieTitle);
                    setValue("genre", movie.genre[0]); // Ensure default selection
                    setValue("duration", movie.duration);
                    setValue("releaseYear", movie.releaseYear.toString()); // Ensure correct format
                    setValue("rating", movie.rating);
                    setValue("summary", movie.summary);
                    setValue("email", user?.email || ""); // Set user email
                }
            } catch (error) {
                console.error("Failed to fetch movie", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id, setValue, user]);

    // Handle form submission (Update Movie)
    const onSubmit = async (data) => {
        data.rating = Number(data.rating);
        data.duration = Number(data.duration);
        data.genre = [data.genre];

        const response = await fetch(`http://localhost:5000/movies/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success("Movie updated successfully!");
            navigate(`/movies/${id}`); // Redirect to movie details
        } else {
            toast.error("Failed to update movie.");
        }
    };

    if (loading) return <p>Loading movie data...</p>;

    return (
        <Container className="mt-5 py-5">
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <h2 className="text-center text-light">Update Movie</h2>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* User Email (Read-Only) */}
                        <Form.Group>
                            <Form.Label className="text-light mt-3">Your Email</Form.Label>
                            <Form.Control
                                type="email"
                                {...register("email")}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light mt-3">Movie Poster URL</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("moviePoster", { required: "Movie Poster URL is required" })}
                            />
                            {errors.moviePoster && <p className="text-danger">{errors.moviePoster.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light mt-3">Movie Title</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("movieTitle", { required: "Movie title is required" })}
                            />
                            {errors.movieTitle && <p className="text-danger">{errors.movieTitle.message}</p>}
                        </Form.Group>

                      
                        <Form.Group>
                            <Form.Label className="text-light mt-3">Genre</Form.Label>
                            <Form.Select {...register("genre", { required: "Genre is required" })}>
                                <option value="">Select Genre</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                                <option value="Action">Action</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                            </Form.Select>
                            {errors.genre && <p className="text-danger">{errors.genre.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light mt-3">Duration (in minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("duration", { required: "Duration is required" })}
                            />
                            {errors.duration && <p className="text-danger">{errors.duration.message}</p>}
                        </Form.Group>

                   
                        <Form.Group>
                            <Form.Label className="text-light mt-3">Release Year</Form.Label>
                            <Form.Select {...register("releaseYear", { required: "Release year is required" })}>
                                <option value="">Select Year</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </Form.Select>
                            {errors.releaseYear && <p className="text-danger">{errors.releaseYear.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light mt-3">Rating</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("rating", { required: "Rating is required" })}
                            />
                            {errors.rating && <p className="text-danger">{errors.rating.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light mt-3">Summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                {...register("summary", { required: "Summary is required" })}
                            />
                            {errors.summary && <p className="text-danger">{errors.summary.message}</p>}
                        </Form.Group>

                        <Button className="mt-3" variant="warning" type="submit">
                            Update Movie
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateMovie;