import axios from "axios";
import { base_url } from "../constants";

const login = async (data) => {
    try {
        let response = await axios.post(`${base_url}/login`, data);
        return response.data;
    } catch (err) {
        console.error(err);
    };
};

const register = async (data) => {
    try {
        let response = await axios.post(`${base_url}/login/register`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    };
};

export {login, register};