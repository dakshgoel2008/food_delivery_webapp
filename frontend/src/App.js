import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/Error";
import Navbar from "./Components/Navbar.js"; // Import the Navbar component
import RestaurantPage from "./Pages/RestaurantPage.js";
import Cart from "./Pages/Cart.js";
// React - bootstrap stuffs
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FrontPage from "./Pages/FrontPage.js";
import ContactPage from "./Pages/ContactPage.js";

<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossOrigin="anonymous"
></link>;
const App = () => {
    return (
        <div>
            {<Navbar />}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Main Home Page */}
                <Route path="/app" element={<Home />} />
                <Route path="/orderHistory" element={<orderHistory />}></Route>
                {/* Particular Restaurant page */}
                <Route path="/restaurant/:restaurant_id" element={<RestaurantPage />} />
                {/* Cart */}
                <Route path="/cart" element={<Cart />}></Route>
                {/* Funny Error Page */}
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<FrontPage />}></Route>
                <Route path="/contactUs" element={<ContactPage />}></Route>
            </Routes>
        </div>
    );
};

export default App;
