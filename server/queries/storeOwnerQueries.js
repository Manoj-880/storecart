const db = require('../utils/dbConfig');

// Fetch all store owners
const getAllOwners = async () => {
    try {
        const query = 'SELECT * FROM storeOwners';
        const [rows] = await db.promise().query(query);
        return rows;
    } catch (err) {
        return "Database Error: " + err.message;
    }
};

// Fetch store owner by ID
const getOwnerById = async (id) => {
    try {
        const query = 'SELECT * FROM storeOwners WHERE owner_id = ?';
        const [rows] = await db.promise().query(query, [id]);
        if (rows.length === 0) {
            return "Owner not found";
        }
        return rows[0];
    } catch (err) {
        return "Database Error: " + err.message;
    }
};

const getOwnerByMobile = async (mobile) => {
    try {
        const query = 'SELECT * FROM storeOwners WHERE mobile_number = ?';
        const [rows] = await db.promise().query(query, [mobile]);
        return rows[0];
    } catch (err) {
        return "Database Error: " + err.message;
    }
}

const addOwner = async (ownerData) => {
    try {
        const {mobile_number, password } = ownerData;
        const query = 'INSERT INTO storeOwners (mobile_number, password) VALUES (?, ?)';
        const [result] = await db.promise().query(query, [mobile_number, password]);

        if (result.affectedRows === 1) {
            return {
                success: true,
                message: 'Owner added successfully'
            };
        } else {
            return {
                suc: false,
                message: 'Failed to add owner'
            };
        }
    } catch (err) {
        return "Database Error: " + err.message;
    }
};

const updateOwnerById = async (id, updatedData) => {
    try {
        const { name, email, mobile_number, password } = updatedData;
        const query = 'UPDATE storeOwners SET name = ?, email = ?, mobile_number = ?, password = ? WHERE owner_id = ?';
        const [result] = await db.promise().query(query, [name, email, mobile_number, password, id]);

        if (result.affectedRows === 0) {
            return "Owner not found or no changes made";
        }
        return { message: 'Owner updated successfully' };
    } catch (err) {
        return "Database Error: " + err.message;
    }
};

const deleteOwnerById = async (id) => {
    try {
        const query = 'DELETE FROM storeOwners WHERE owner_id = ?';
        const [result] = await db.promise().query(query, [id]);

        if (result.affectedRows === 0) {
            return "Owner not found";
        }
        return { message: 'Owner deleted successfully' };
    } catch (err) {
        return "Database Error: " + err.message;
    }
};

module.exports = {
    getAllOwners,
    getOwnerById,
    getOwnerByMobile,
    addOwner,
    updateOwnerById,
    deleteOwnerById,
};