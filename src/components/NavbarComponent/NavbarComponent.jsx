import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavbarCompopnent.css'

const NavbarComponent = () => {
  
    const [showName, setShowName] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); 
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      
                <Navbar
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    className={`py-3 custom-navbar ${scrolled ? "sticky" : ""} shadow-lg`}
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
                                            <div
                                                className="position-absolute bg-white text-dark p-2 rounded shadow"
                                                style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}
                                            >
                                                Khadiza
                                            </div>
                                        )}
                                    </div>
                                    <Button variant="danger" className="ms-3 fw-bold">
                                        Log Out
                                    </Button>
                                    <Button variant="danger" className="ms-3  fw-bold">
                                    <Nav.Link as={Link} to="/login" className="text-light py-0 my-0">Login</Nav.Link>
                                    </Button>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
          
    );
};





export default NavbarComponent;