import React, { useEffect } from "react";
import axios from "axios";
const App = () => {
    useEffect(() => {
        axios
            .get("http://localhost:4444")
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    });
    return <div>App</div>;
};

export default App;
