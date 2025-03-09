import { Container, Row, Col, Button } from "react-bootstrap";
import './NoorflixHero.css';
import subscribe from '../../assets/subscribe.webp'
import { useTheme } from "../theme/Theme";

const NoorflixHero = () => {
    const { isDarkMode} = useTheme();
    return (
        <section  className={` ${isDarkMode ? "noorflix-hero" : "noorflix-hero-light"}`} >
            <Container>
                <Row className="align-items-center ">
                    <Col lg={6} className="text-center text-lg-start mb-5">
                        <h1 className="hero-title">Unlimited Movies, TV Shows & More</h1>
                        <p className="hero-desc">
                            Watch anywhere. Cancel anytime. Join Noorflix today!
                        </p>
                        <Button variant="danger" className="hero-btn mb-5">
                            Start Watching
                        </Button>
                    </Col>
                    <Col lg={6} className="text-center">
                        <img
                            src={subscribe}
                            alt="Noorflix Banner"
                            className="hero-image"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NoorflixHero;
