import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import './NavbarCompopnent.css'
import { Link } from "react-router-dom";

const NavbarComponent = () => {
    const navRef = useRef(null);
    const [showName, setShowName] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (navRef.current) {
                gsap.from(navRef.current, { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
            }
        }, 200);
        return () => clearTimeout(timer);
    }, []);




    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div ref={navRef}>
                <Navbar expand="lg" bg="dark" variant="dark" 
                className={` py-3 custom-navbar ${scrolled ? "sticky" : ""} shadow-lg`}
             >
                    <Container>
                        <Navbar.Brand to="/home" className="fw-bold text-danger">NoorFlix</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto text-uppercase fw-semibold">
                                <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
                                <Nav.Link as={Link} to="/all-movies" className="text-light">All Movies</Nav.Link>
                                <Nav.Link as={Link} to="/add-movie" className="text-light">Add Movie</Nav.Link>
                                <Nav.Link as={Link} to="/favorites" className="text-light">My Favorites</Nav.Link>
                                <Nav.Link as={Link} to="/about" className="text-light">About</Nav.Link>
                                <Nav.Link as={Link} to="/contact" className="text-light">Contact</Nav.Link>
                                <Nav.Link as={Link} to="/blogs" className="text-light">Blogs</Nav.Link>
                                <div className="d-flex align-items-center ms-3">
                                    <div
                                        className="position-relative"
                                        onMouseEnter={() => setShowName(true)}
                                        onMouseLeave={() => setShowName(false)}
                                    >
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                            alt="User"
                                            className="rounded-circle border border-danger"
                                            width="40"
                                            height="40"
                                            style={{ cursor: "pointer" }}
                                        />
                                        {showName && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="position-absolute bg-white text-dark p-2 rounded shadow"
                                                style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}
                                            >
                                                Khadiza
                                            </motion.div>
                                        )}
                                    </div>
                                    <Button variant="danger" className="ms-3 fw-bold">
                                        Log Out
                                    </Button>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </motion.div>
    );
};




export default NavbarComponent;