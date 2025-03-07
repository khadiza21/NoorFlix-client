
import Banner from '../components/Banner/Banner';
import FeaturedMovies from '../components/FeaturedMovies/FeaturedMovies';
import NoorflixBlog from '../components/NoorflixBlog/NoorflixBlog';
import NoorflixHero from '../components/NoorflixHero/NoorflixHero';

const Home = () => {
    return (
        <>
        <Banner /> 
        <FeaturedMovies />
        <NoorflixHero />
        <NoorflixBlog />
        </>
    );
};

export default Home;