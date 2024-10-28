const db = require('../utils/dbConfig');

const getAllStores = async () => {
    try {
        const query = 'select * from stores';
        const [rows] = await db.promise().query(query);
        return rows;
    } catch (error) {
        return "Database Error: "+ error.message;
    };
};

const getStoresById = async (id) => {
    try {
        const query = 'select * from stores where owner_id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows;
    } catch (error) {
        return "Database Error: "+ error.message;
    };
};

const addStore = async (data) => {
    try {
        const query = 'insert into stores(store_name, location, owner_id, address) values (?, ?, ?, ?)';
        const [rows] = await db.promise().query(query, [data.store_name, data.location, data.owner_id, data.address]);
        return rows;
    } catch (error) {
        return "Database Error: "+error.message
    };
};

const update = async (data) => {
    try {
        const query = 'update stores set store_name = ?, location = ?, address = ? where store_id = ?';
        const [rows] = await db.promise().query(query, [data.store_name, data.location, data.address, data.id]);
        return rows;
    } catch (error) {
        return "Database Error: "+ error.message
    }
}

module.exports = {
    getAllStores,
    getStoresById,
    addStore,
    update,
}