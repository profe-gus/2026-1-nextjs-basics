import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "https://randomuser.me/api/",
    baseURL: "http://localhost:9000/api/",
    headers: {
        "Content-Type":"application/json"
    }
});

export default axiosInstance

//agregar un interceptor en un futuro...