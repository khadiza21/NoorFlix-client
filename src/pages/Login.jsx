import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // Dummy authentication (replace with actual API request)
        if (data.email === "test@example.com" && data.password === "password123") {
            toast.success("Login successful!");
            navigate("/");
        } else {
            toast.error("Invalid email or password");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-100 bg-dark py-5 px-3 rounded-3 shadow-lg" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4 text-light ">Login</h2>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...register("password", { required: "Password is required" })}
                            />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </Form.Group>

                        <a href="#" className="text-secondary">Forgot Password?</a>
                      

                    <Button variant="light" className="fw-bold w-100 mt-3" type="submit">Login</Button>


                    <div className="text-center mt-3 text-light">
                     
                        <Button variant="danger" className="w-100" >
                            Sign in with Google
                        </Button>
                        <p className="my-2">
                            Don't have any account? <a href="/register" className="text-secondary">Register</a>
                        </p>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
