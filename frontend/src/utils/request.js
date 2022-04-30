const axios = require("axios");
const axiosClient = axios.create({baseURL: "http://localhost:8080/"});

module.exports.postRequest = (URL, payload) => {
    // let auth = localStorage.getItem("auth");
    // let token = " ";
    // if (auth) {asd
    //     token = auth.split(" ")[1];
    // }

    const token = null;

    return axiosClient.post(URL, payload, {
        withCredentials: true,
        headers: {authorization: `Bearer ${token}`},
    });
};