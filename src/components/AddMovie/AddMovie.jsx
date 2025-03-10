import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../Provider/AuthProvider";
import { useTheme } from "../theme/Theme";



const AddMovie = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
        setError,
        clearErrors
    } = useForm({
        defaultValues: {
            rating: 0,
        }
    });
    const { isDarkMode } = useTheme();
    const ratingValue = watch("rating");
    const { user } = useContext(AuthContext);

    const handleRating = (rate) => {
        setValue("rating", rate, { shouldValidate: true });
        clearErrors("rating");
    };



    const onSubmit = async (data) => {
        data.rating = Number(data.rating);
        data.duration = Number(data.duration);
        data.genre = [data.genre];
        data.email = user?.email || "";

        if (data.rating === 0) {
            setError("rating", { type: "manual", message: "Rating is required!" });
            return;
        }
        console.log(data)

        const response = await fetch("https://noorflix-s.vercel.app/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            reset();
            setValue("rating", 0, { shouldValidate: true });
            toast.success("Movie added successfully!");
        } else {
            toast.error("Failed to add movie.");
        }


    };

    return (
        <Container className="mt-5 py-5">
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <h2 className={` text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Add Movie</h2>

                    <Form.Group className="mb-3">
                        <Form.Label className={isDarkMode ? 'text-light' : 'text-dark'}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", { required: "Email is required" })}
                            defaultValue={user?.email || ""}
                            readOnly
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </Form.Group>


                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Movie Poster URL</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("moviePoster", {
                                    required: "Movie Poster URL is required",
                                    pattern: {
                                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i,
                                        message: "Invalid image URL",
                                    },
                                })}
                            />
                            {errors.moviePoster && <p className="text-danger">{errors.moviePoster.message}</p>}
                        </Form.Group>


                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Movie Title</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("movieTitle", {
                                    required: "Movie title is required",
                                    minLength: { value: 2, message: "Title must be at least 2 characters" },
                                })}
                            />
                            {errors.movieTitle && <p className="text-danger">{errors.movieTitle.message}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Genre</Form.Label>
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

                        {/* Duration */}
                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Duration (in minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("duration", {
                                    required: "Duration is required",
                                    min: { value: 60, message: "Duration must be at least 60 minutes" },
                                })}
                            />
                            {errors.duration && <p className="text-danger">{errors.duration.message}</p>}
                        </Form.Group>

                        {/* Release Year */}
                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Release Year</Form.Label>
                            <Form.Select {...register("releaseYear", { required: "Release year is required" })}>
                                <option value="">Select Year</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </Form.Select>
                            {errors.releaseYear && <p className="text-danger">{errors.releaseYear.message}</p>}
                        </Form.Group>

                        {/* Rating */}
                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Rating</Form.Label>
                            <Rating
                                onClick={handleRating}

                            />
                            {errors.rating && <p className="text-danger">{errors.rating.message}</p>}
                        </Form.Group>

                        {/* Summary */}
                        <Form.Group>
                            <Form.Label className={`mt-3 text-center ${isDarkMode ? "text-light" : "text-dark"}`}>Summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                {...register("summary", {
                                    required: "Summary is required",
                                    minLength: { value: 10, message: "Summary must be at least 10 characters" },
                                })}
                            />
                            {errors.summary && <p className="text-danger">{errors.summary.message}</p>}
                        </Form.Group>

                        {/* Submit Button */}
                        <Button className="mt-3" variant="danger" type="submit">Add Movie</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};




export default AddMovie;