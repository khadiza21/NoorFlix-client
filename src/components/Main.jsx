import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarComponent from "./NavbarComponent/NavbarComponent";


const Main = () => {
    const location = useLocation();
    const hideHeaderFooter = ["/404","*"];
    const shouldHideHeaderFooter = hideHeaderFooter.includes(location.pathname);
    return (
        <div>
            {!shouldHideHeaderFooter && <NavbarComponent/>}
            <Outlet />
            {!shouldHideHeaderFooter && <Footer />}

        </div>
    );
};

export default Main;