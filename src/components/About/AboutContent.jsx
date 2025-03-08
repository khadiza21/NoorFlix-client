import { Accordion, Card, Col, Container, Image, Row } from 'react-bootstrap';
import './About.css'

const AboutContent = () => {
    return (
        <div>
            <Container className="my-5">

                <Row className="text-center mb-5 ">
                    <Col>
                        <h2 className="fw-bold text-light mb-5">About Noorflix</h2>
                        <p className="text-light">
                            Noorflix is your ultimate destination for streaming high-quality content. We bring you the best movies, TV shows, and exclusive series at your fingertips.
                        </p>
                    </Col>
                </Row>





                <Row className="align-items-center my-5 py-5 px-0 mx-0 ">
                    <Col md={6} className="text-center mb-4 mb-md-0  px-0 ">
                        <Image
                            src="https://live.staticflickr.com/65535/49389103952_ff4b2cf256.jpg"
                            alt="About Us"
                            fluid
                            rounded
                        />
                    </Col>
                    <Col md={6} className='pr-0'>
                        <h2 className="fw-bold text-light">About Us</h2>
                        <p className="text-light">
                            We are committed to providing the best services to our customers.
                            Our team works tirelessly to bring you the latest and greatest
                            solutions tailored to your needs.
                            We are committed to providing the best services to our customers.
                            Our team works tirelessly to bring you the latest and greatest
                            solutions tailored to your needs.
                            We are committed to providing the best services to our customers.
                            Our team works tirelessly to bring you the latest and greatest
                            solutions tailored to your needs.
                        </p>
                        <p className="text-light">
                            With years of experience and a passion for excellence, we ensure
                            quality and customer satisfaction in everything we do.  We are committed to providing the best services to our customers.
                            Our team works tirelessly to bring you the latest and greatest
                            solutions tailored to your needs.
                        </p>
                    </Col>
                </Row>





                <Row className="mb-5">
                    <Col md={4} sm={12} className="mb-4">
                        <Card className="feature-card shadow border-danger text-center p-4 h-100">
                            <Card.Body className="feature-body">
                                <h4 className="fw-bold">High-Quality Streaming</h4>
                                <p>Enjoy movies and shows in 4K Ultra HD without buffering.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} className="mb-4">
                        <Card className="feature-card shadow border-danger text-center p-4 h-100">
                            <Card.Body className="feature-body">
                                <h4 className="fw-bold">Multi-Device Access</h4>
                                <p>Watch on your TV, laptop, tablet, and mobile anytime, anywhere.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} className="mb-4">
                        <Card className="feature-card shadow border-danger text-center p-4 h-100">
                            <Card.Body className="feature-body">
                                <h4 className="fw-bold">Exclusive Content</h4>
                                <p>Get access to original series and movies only on Noorflix.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="bg-dark text-white p-5 rounded mt-5">
                    <Col>
                        <h2 className="fw-bold text-center my-3">Why Choose Noorflix?</h2>
                        <p className='mb-5'>
                            We offer a seamless streaming experience with an ad-free
                            environment, affordable pricing, and a vast content library
                            tailored to your interests.
                        </p>
                        <Accordion className="bg-dark text-white" defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className='bg-dark'>Ad-Free Experience</Accordion.Header>
                                <Accordion.Body className="bg-dark text-white">
                                    Tired of annoying ads interrupting your favorite shows? With Noorflix, enjoy an uninterrupted streaming experience where you can binge-watch movies and TV series without any commercial breaks. Your entertainment, without distractions.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Affordable Pricing</Accordion.Header>
                                <Accordion.Body className="bg-dark text-white">
                                    We believe that quality entertainment should be accessible to everyone. That’s why Noorflix offers budget-friendly subscription plans, giving you premium content without breaking the bank. Enjoy unlimited streaming at the best value!
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Vast Content Library</Accordion.Header>
                                <Accordion.Body className="bg-dark text-white">
                                    From the latest blockbusters to timeless classics, Noorflix provides an extensive collection of movies, TV series, documentaries, and exclusive originals. No matter your taste, there’s always something new to discover on Noorflix!
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutContent;