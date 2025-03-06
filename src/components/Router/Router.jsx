import { createBrowserRouter } from "react-router-dom";
import Main from "../Main";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Notfound from "../../pages/Notfound";
import Contact from "../../pages/Contact";
import MovieDetails from "../MovieDetails/MovieDetails";
import Movies from "../Movies/Movies";

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
      element: <Notfound />
    },
  ]);