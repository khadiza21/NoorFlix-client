import React, { useState } from "react";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert("Registration Successful!");
        navigate("/");
    };

    const handleGoogleLogin = () => {
        // Simulating Google Login
        alert("Google Login Successful!");
        navigate("/");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg bg-dark" style={{ maxWidth: "400px", width: "100%" }}>
                <Card.Title className="text-center mb-4 fs-3 fw-bold text-light">
                    Register
                </Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-danger small">{errors.name.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="text-danger small">{errors.email.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Photo URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your photo URL"
                            {...register("photo", { required: "Photo URL is required" })}
                        />
                        {errors.photo && <p className="text-danger small">{errors.photo.message}</p>}
                    </Form.Group>









                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Password</Form.Label>

                        <InputGroup>
                            <Form.Control

                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                        message: "Password must contain at least one uppercase and one lowercase letter",
                                    },
                                })}
                            />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                        {errors.password && <p className="text-danger small">{errors.password.message}</p>}
                    </Form.Group>




                    <Button variant="danger" type="submit" className="w-100 fw-bold">
                        Register
                    </Button>
                </Form>

                <div className="text-center mt-3">

                    <Button variant="light" className="w-100" onClick={handleGoogleLogin}>
                        Sign in with Google
                    </Button>
                    <p className="my-2 text-light">
                        Already have an account? <a className="text-secondary" href="/login">Login</a>
                    </p>
                </div>
            </Card>
        </Container>
    );
};

export default Register;
