import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './NavbarCompopnent.css'
import { AuthContext } from "../Provider/AuthProvider";

const NavbarComponent = () => {

    const [showName, setShowName] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, signOutUser, setUser } = useContext(AuthContext);
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


                        {user && (<><Nav.Link as={Link} to="/add-movie" className="text-light">Add Movie</Nav.Link>  </>)}
                        {user && (<><Nav.Link as={Link} to="/favorites" className="text-light">My Favorites</Nav.Link>  </>)}




                        <Nav.Link as={Link} to="/about" className="text-light">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-light">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" className="text-light">Blogs</Nav.Link>



                        <div className="d-flex align-items-center ms-3">

                            {user && user?.email ? (
                                <>

                                    {/* {user?.photoURL ? (
                                        <div className="user-profile me-2">
                                            <img src={user?.photoURL} alt="User Avatar" className="user-avatar" />
                                            <small className="user-name">{user.displayName}</small>
                                        </div>
                                    ) */}
                                    <div
                                        className="position-relative"
                                        onMouseEnter={() => setShowName(true)}
                                        onMouseLeave={() => setShowName(false)}
                                    >

                                        {user?.photoURL ? <img
                                            src={user?.photoURL}
                                            alt="User"
                                            className="rounded-circle border border-danger"
                                            width="40"
                                            height="40"
                                            style={{ cursor: "pointer" }}
                                        /> : <img
                                            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                            alt="User"
                                            className="rounded-circle border border-danger"
                                            width="40"
                                            height="40"
                                            style={{ cursor: "pointer" }}
                                        />}
                                        {showName && (
                                            <div
                                                className="position-absolute bg-white text-dark p-2 rounded shadow"
                                                style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}
                                            >
                                                {user?.displayName}
                                            </div>
                                        )}

                                    </div>
                                    <Button onClick={handleSignOut} variant="danger" className="ms-3 fw-bold">
                                        Log Out
                                    </Button>


                                </>
                            ) : (
                                <>
                                    <Button variant="danger" className="ms-3  fw-bold">
                                        <Nav.Link as={Link} to="/login" className="text-light py-0 my-0">Login</Nav.Link>
                                    </Button>
                                </>
                            )}

                        </div>




                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};





export default NavbarComponent;