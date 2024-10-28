const storeQueries = require('../queries/storesQueries');

const getAllStores = async (req, res) => {
    try {
        let response = await storeQueries.getAllStores();
        return response.data;
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server error",
        });
    };
};

const getStoresById = async (req, res) => {
    try {
        let id = req.params.id;
        let stores = await storeQueries.getStoresById(id);
        if(stores.length > 0){
            res.status(200).send({
                success: true,
                message: "Stores fetched successfully",
                data: stores,
            });
        } else {
            res.status(200).send({
                success: true,
                message: "No stores found",
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server error",
        });
    };
};

const addStore = async (req, res) => {
    try {
        let data = req.body;
        let response = await storeQueries.addStore(data);
        if(response) {
            res.status(200).send({
                success: true,
                message: "Store added successfully",
            });
        } else {
            res.status(200).send({
                success: false,
                message: "Error while adding store",
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server error",
        });
    };
};

const update = async (req, res) => {
    try {
        let data = req.body;
        let response = await storeQueries.update(data);
        if(response){
            res.status(200).send({
                success: true,
                message: "Store updated successfully",
            });
        } else {
            res.status(200).send({
                success: false,
                message: "Error while updating store",
            });
        };
    } catch (error) {
        res.status(200).send({
            success: false,
            message: "Internal server error",
        });
    };
};

module.exports = {
    getAllStores,
    getStoresById,
    addStore,
    update,
}