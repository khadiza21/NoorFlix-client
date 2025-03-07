import { createBrowserRouter } from "react-router-dom";
import Main from "../Main";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import MovieDetails from "../MovieDetails/MovieDetails";
import Movies from "../Movies/Movies";
import AddMovie from "../AddMovie/AddMovie";
import NotFound from "../NotFound/NotFound";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        },
  
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/all-movies',
          element: <Movies />
        },
        {
          path: '/add-movie',
          element: <AddMovie />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/movies/:id',
          element: <MovieDetails />
        },
      ]
    },
    {
      path: '*',
      element: <NotFound />
    },
  ]);