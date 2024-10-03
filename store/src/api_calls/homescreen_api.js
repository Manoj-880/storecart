import axios from "axios";
import { base_url } from "../constants";

const hemoScreenData = async (id) => {
    try {
        let response = await axios.get(`${base_url}/homescreen/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export {hemoScreenData};