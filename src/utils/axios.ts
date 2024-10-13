import axios from "axios";

const instance = axios.create({
    baseURL: "https://tattoo-shop-801cb78430a8.herokuapp.com",
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', config);
    return config;
});


export default instance;