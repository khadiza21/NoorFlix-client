import { createBrowserRouter } from "react-router-dom";
import Main from "../Main";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import MovieDetails from "../MovieDetails/MovieDetails";
import Movies from "../Movies/Movies";
import AddMovie from "../AddMovie/AddMovie";
import NotFound from "../NotFound/NotFound";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import PrivateRoutes from "./PrivateRoutes";

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
          element: <PrivateRoutes><AddMovie /></PrivateRoutes>
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/movies/:id',
          element: <PrivateRoutes><MovieDetails /></PrivateRoutes>
        },
      ]
    },
    {
      path: '*',
      element: <NotFound />
    },
  ]);