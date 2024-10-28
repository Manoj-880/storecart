import axios from "axios";
import { base_url } from "../constants";

const getAllStores = async () => {
    try {
        let response = await axios.get(`${base_url}/store`);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};

const getStoreByOwnerid = async (id) => {
    try {
        let response = await axios.get(`${base_url}/store/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};

const addStore = async (data) => {
    try {
        let response = await axios.post(`${base_url}/store/add`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};

const update = async (data) => {
    try {
        let response = await axios.put(`${base_url}/store/update`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export {
    getAllStores,
    getStoreByOwnerid,
    addStore,
    update,
}