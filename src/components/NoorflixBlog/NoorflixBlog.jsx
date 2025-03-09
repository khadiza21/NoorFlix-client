import { Container, Row, Col, Card, Button } from "react-bootstrap";
import './NoorflixBlog.css'
import blog1 from "../../assets/blog1.avif" 
import blog2 from "../../assets/blog3.webp" 
import blog3 from "../../assets/blog2.jpg" 
import blog4 from "../../assets/subscribe.webp" 
import { useTheme } from "../theme/Theme";

const blogPosts = [
  { id: 1, title: "New Releases on Noorflix", description: "Check out the latest releases on Noorflix this month!", image: blog1 },
  { id: 2, title: "Top Rated Movies to Watch", description: "Find the top-rated movies of all time on Noorflix.", image: blog2  },
  { id: 3, title: "Upcoming Movies in 2025", description: "Exciting new movies that will be released in 2025.", image:  blog4 },
  { id: 4, title: "Must-Watch Web Series", description: "The best web series to binge-watch on Noorflix.", image:  blog3 },
];

const NoorflixBlog = () => {
  const { isDarkMode} = useTheme();
  return (
    <section className={` ${isDarkMode ? "noorflix-blog" : "noorflix-blog-light"}`}>
      <Container>
        <h2 className="section-title">📝 Noorflix Blog</h2>
        <Row>
          {blogPosts.map((post) => (
            <Col key={post.id} xs={12} md={6} lg={3}>
              <Card className={`shadow-sm ${isDarkMode ? "blog-card" : "blog-card-light"}`}>
                <Card.Img variant="top" src={post.image} alt={post.title} />
                <Card.Body>
                  <Card.Title className="blog-title">{post.title}</Card.Title>
                  <Card.Text className="blog-desc">{post.description}</Card.Text>
                  <Button variant="danger" className="read-more-btn">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default NoorflixBlog;
