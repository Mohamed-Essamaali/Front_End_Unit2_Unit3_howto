import axios from "axios";

const axiosAuth = () => {

    const token = localStorage.getItem('token')
    return axios.create({
        baseURL: "",
        headers: {
            authorization: "BEARER " + token
        }
    })
}

export default axiosAuth;