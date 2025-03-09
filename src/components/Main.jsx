import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarComponent from "./NavbarComponent/NavbarComponent";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";


const Main = () => {
   
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const hideHeaderFooter = ["/404", "*"];
    const shouldHideHeaderFooter = hideHeaderFooter.includes(location.pathname);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (

        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100 bg-dark"><HashLoader color="#dc143c" size={60} /></div>

            ) : (
                <div>
                    {!shouldHideHeaderFooter && <NavbarComponent />}
                    <Outlet />
                    {!shouldHideHeaderFooter && <Footer />}</div>
            )}
        </div>




    );
};

export default Main;