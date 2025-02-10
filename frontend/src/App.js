import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/Error"
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/app" element={<Home />} />
                <Route path = "*" element = {<ErrorPage />}></Route>
            </Routes>
        </div>
    );
};

export default App;
