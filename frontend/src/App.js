import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/Error";
import Navbar from "./Components/Navbar.js"; // Import the Navbar component
import RestaurantPage from "./Pages/RestaurantPage.js";

// React - bootstrap stuffs
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossOrigin="anonymous"
></link>;
const App = () => {
    return (
        <div>
            {/* Conditionally render the Navbar */}
            {<Navbar />}

            <Routes>
                {/* Authentication pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Main Home Page */}
                <Route path="/app" element={<Home />} />

                {/* Particular Restaurant page */}
                <Route path="/restaurant/:restaurant_id" element={<RestaurantPage />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
};

export default App;
