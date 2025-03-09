import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTheme } from "../theme/Theme";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(true);
  
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://noorflix-s.vercel.app/movies/${id}`);
        const movie = await response.json();

        if (response.ok) {
          setValue("moviePoster", movie.moviePoster);
          setValue("movieTitle", movie.movieTitle);
          setValue("genre", movie.genre[0]);
          setValue("duration", movie.duration);
          setValue("releaseYear", movie.releaseYear.toString());
          setValue("rating", movie.rating);
          setValue("summary", movie.summary);
          setValue("email", user?.email || "");
        }
      } catch (error) {
        console.error("Failed to fetch movie", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, setValue, user]);

  const onSubmit = async (data) => {
    data.rating = Number(data.rating);
    data.duration = Number(data.duration);
    data.genre = [data.genre];

    const response = await fetch(`https://noorflix-s.vercel.app/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Movie updated successfully!");
      navigate(`/movies/${id}`);
    } else {
      toast.error("Failed to update movie.");
    }
  };

  if (loading) return <p>Loading movie data...</p>;

  return (
    <Container className="mt-5 py-5">
      <Row className="justify-content-center">
        <Col md={6} sm={12}>
          <h2   className={`text-center ${isDarkMode ? "text-light" : "text-dark"}`} >Update Movie</h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* User Email (Read-Only) */}
            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Your Email</Form.Label>
              <Form.Control type="email" {...register("email")} readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>
                Movie Poster URL
              </Form.Label>
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
              {errors.moviePoster && (
                <p className="text-danger">{errors.moviePoster.message}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Movie Title</Form.Label>
              <Form.Control
                type="text"
                {...register("movieTitle", {
                  required: "Movie title is required",
                  minLength: { value: 2, message: "Title must be at least 2 characters" },
                })}
              />
              {errors.movieTitle && (
                <p className="text-danger">{errors.movieTitle.message}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Genre</Form.Label>
              <Form.Select
                {...register("genre", { required: "Genre is required" })}
              >
                <option value="">Select Genre</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Action">Action</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </Form.Select>
              {errors.genre && (
                <p className="text-danger">{errors.genre.message}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>
                Duration (in minutes)
              </Form.Label>
              <Form.Control
                type="number"
                {...register("duration", { 
                    required: "Duration is required" ,
                    min: { value: 60, message: "Duration must be at least 60 minutes" },
                })}
              />
              {errors.duration && (
                <p className="text-danger">{errors.duration.message}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Release Year</Form.Label>
              <Form.Select
                {...register("releaseYear", {
                  required: "Release year is required",
                })}
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </Form.Select>
              {errors.releaseYear && (
                <p className="text-danger">{errors.releaseYear.message}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Rating</Form.Label>
              <Form.Control
                type="number"
                {...register("rating", { required: "Rating is required" })}
              />
              {errors.rating && (
                <p className="text-danger">{errors.rating.message}</p>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label     className={`mt-3 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("summary", { required: "Summary is required",
                    minLength: { value: 10, message: "Summary must be at least 10 characters" },
                 })}
              />
              {errors.summary && (
                <p className="text-danger">{errors.summary.message}</p>
              )}
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
