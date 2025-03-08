import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../components/Provider/AuthProvider";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { signInUser, signWithGoogle, setUser } = useContext(AuthContext);

    const onSubmit = (data) => {

        const { email, password } = data;
        signInUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                toast.success('Login Successful! Redirecting...');
                navigate(location.state?.from || "/", { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    };


    const handleGoogleSignIn = () => {

        signWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user)
                navigate(location?.state ? location.state : '/')
                toast.success("Google Sign-In Successful!");
            }).catch((error) => {
                console.log(error);
                toast.error(error.message)
            });
    }


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

                        <Button onClick={handleGoogleSignIn} variant="danger" className="w-100" >
                            <FaGoogle />  Sign in with Google
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
