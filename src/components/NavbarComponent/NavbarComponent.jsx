import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './NavbarCompopnent.css'
import { AuthContext } from "../Provider/AuthProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../theme/Theme";

const NavbarComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, signOutUser, setUser } = useContext(AuthContext);
    const { isDarkMode, setIsDarkMode} = useTheme();
    const getNavLinkClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


   
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                setUser(null)
                navigate('/')
            })
            .catch((error) => {
                console.log("error ", error);
            });
    };

    console.log(user, 'user');
    return (

        <Navbar
            expand="lg"
            bg={isDarkMode ? 'dark' : 'light'}
            variant={isDarkMode ? 'dark' : 'light'}
            className={`py-3 custom-navbar ${scrolled ? "sticky" : ""} shadow-lg`}
        >
            <Container>
                <Navbar.Brand to="/home" className="fw-bold text-danger"><Nav.Link as={Link} to="https://noorflix.netlify.app/"  className={isDarkMode ? 'text-light' : 'text-dark'}>NoorFlix</Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-uppercase fw-semibold">
                        <Nav.Link as={Link} to="/"  className={isDarkMode ? 'text-light' : 'text-dark'}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/all-movies"  className={isDarkMode ? 'text-light' : 'text-dark'}>All Movies</Nav.Link>


                        {user && (<><Nav.Link as={Link} to="/add-movie"  className={isDarkMode ? 'text-light' : 'text-dark'}>Add Movie</Nav.Link>  </>)}
                        {user && (<><Nav.Link as={Link} to="/favorites"  className={isDarkMode ? 'text-light' : 'text-dark'}>My Favorites</Nav.Link>  </>)}




                        <Nav.Link as={Link} to="/about"  className={isDarkMode ? 'text-light' : 'text-dark'}>About</Nav.Link>
                        <Nav.Link as={Link} to="/contact"  className={isDarkMode ? 'text-light' : 'text-dark'}>Contact</Nav.Link>
                        <Nav.Link as={Link} to="/blogs"  className={isDarkMode ? 'text-light' : 'text-dark'}>Blogs</Nav.Link>



                        <div className="d-flex align-items-center ms-3">
                            {user && user?.email ? (
                                <>
                                    <div
                                        className="position-relative"
                                        onMouseEnter={() => setShowDropdown(true)}
                                        onMouseLeave={() => setShowDropdown(false)}
                                    >
                                        <img
                                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                            alt="User"
                                            className="rounded-circle border border-danger"
                                            width="40"
                                            height="40"
                                            style={{ cursor: "pointer" }}
                                        />

                                     
                                        {showDropdown && (
                                            <div
                                                className="position-absolute bg-white text-dark p-2 rounded shadow"
                                                style={{
                                                    top: "30px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    minWidth: "150px",
                                                    textAlign: "center",
                                                    zIndex: 1000,
                                                }}
                                            >
                                                <p className="mb-2 fw-bold">{user?.displayName || "User"}</p>
                                                <Button onClick={handleSignOut} variant="danger" className="w-100">
                                                    Log Out
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <Button variant="danger" className="ms-3 fw-bold">
                                    <Nav.Link as={Link} to="/login" className="text-light py-0 my-0">
                                        Login
                                    </Nav.Link>
                                </Button>
                            )}

                            <button onClick={toggleTheme} className="toggle-btn ms-2">
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </button>
                        </div>




                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};





export default NavbarComponent;