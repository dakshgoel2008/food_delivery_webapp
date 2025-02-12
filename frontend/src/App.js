import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/Error";
import Navbar from "./Components/Navbar.js"; // Import the Navbar component

const App = () => {
    const location = useLocation();

    // Define routes where the Navbar should appear
    const showNavbarRoutes = ["/app", "/cart", "/history"]; // Add more routes as needed

    // Check if the current route is in the list of routes where the Navbar should appear
    const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

    return (
        <div>
            {/* Conditionally render the Navbar */}
            {shouldShowNavbar && <Navbar />}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/app" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
};

export default App;
