import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    console.log("Loading:", loading);
    console.log("User:", user);

    // if (loading) {
    //     return (<Spinner animation="border" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //     </Spinner>)
    // }

    if (user && user?.email) {
        return children;

    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;