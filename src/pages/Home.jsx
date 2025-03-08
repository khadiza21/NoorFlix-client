
import Banner from '../components/Banner/Banner';
import FeaturedMovies from '../components/FeaturedMovies/FeaturedMovies';
import NoorflixBlog from '../components/NoorflixBlog/NoorflixBlog';
import NoorflixHero from '../components/NoorflixHero/NoorflixHero';

const Home = () => {
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); 
      };
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