const storeOwnerQueries = require('../queries/storeOwnerQueries');

const login = async (req, res) => {
    try {
        let mobile_number = req.body.mobile_number;
        let password = req.body.password;
        let ownerData = await storeOwnerQueries.getOwnerByMobile(mobile_number);
        if(ownerData) {
            if(mobile_number === ownerData.mobile_number && password === ownerData.password) {
                res.status(200).send({
                    success: true,
                    message: "Login Succesfull",
                    data: ownerData,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: "Invalid credentials",
                });
            };
        } else {
            res.status(200).send({
                success: false,
                message: "Owner not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    };
};

const register = async (req, res) => {
    try {
        let mobile_number = req.body.mobile_number;
        let password = req.body.password;
        let registration = await storeOwnerQueries.addOwner({mobile_number, password});
        if(registration.success){
            res.status(200).send({
                success: true,
                message: registration.message,
            });
        } else {
            res.status(200).send({
                success: false,
                message: registration.message,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    login,
    register,
}