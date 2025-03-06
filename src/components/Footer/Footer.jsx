import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 text-center text-md-start">
            <h5>Noorflix</h5>
            <p>One Stop Every Need</p>
            <p><strong>Address:</strong> Dhaka, Bangladesh</p>
            <p><strong>Phone:</strong> 092 3434 3434</p>
            <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
          </Col>

          <Col md={2} className="mb-3 text-center text-md-start">
            <h5>About</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">About Us</a></li>
              <li><a href="#" className="text-light">Delivery Info</a></li>
              <li><a href="#" className="text-light">Privacy Policy</a></li>
              <li><a href="#" className="text-light">Terms & Conditions</a></li>
              <li><a href="#" className="text-light">Contact Us</a></li>
            </ul>
          </Col>

          <Col md={2} className="mb-3 text-center text-md-start">
            <h5>My Account</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Sign In</a></li>
              <li><a href="#" className="text-light">View Cart</a></li>
              <li><a href="#" className="text-light">My Wishlist</a></li>
              <li><a href="#" className="text-light">Track My Order</a></li>
              <li><a href="#" className="text-light">Help</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3 text-center text-md-start">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <FaFacebook size={24} />
              <FaTwitter size={24} />
              <FaInstagram size={24} />
              <FaPinterest size={24} />
              <FaYoutube size={24} />
              <FaLinkedin size={24} />
            </div>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">© 2024 Noorflix. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};



export default Footer;
