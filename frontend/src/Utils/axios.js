import axios from "axios";

const instance = axios.create({
    baseURl: "http://localhost:4444",
    withCredentials: true, // to set cookies on the browser in cross origin requests
});

export default instance;
