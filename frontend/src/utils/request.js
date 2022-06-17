const axios = require("axios");
const axiosClient = axios.create({baseURL: "http://localhost:8080/"});

module.exports.postRequest = (URL, payload) => {
    let auth = localStorage.getItem("token");


    return axiosClient.post(URL, payload, {
        withCredentials: true,
        headers: {authorization: `Bearer ${auth}`},
    });
};

module.exports.getRequest = (URL) => {
    let auth = localStorage.getItem("token");
    return axiosClient.get(URL, {
        withCredentials: true,
        headers: {authorization: `Bearer ${auth}`},
    });
}