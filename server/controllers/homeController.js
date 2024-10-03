const homeQueryies = require("../queries/homeScreenQueries");

const getHomeScreenData = async (req, res) => {
    try {
        let storeId = req.params.id;
        let stockData = await homeQueryies.stockAlertQuery(storeId);
        let recentBillsData = await homeQueryies.getRecentBillsQuery(storeId);
        let salesData = await homeQueryies.getSalesDataQuery(storeId);
        let dailySalesData = await homeQueryies.getDailySalesQuery(storeId);
        res.status(200).send({
            success: true,
            message: "data fetched successfully",
            data: {
                stockData, recentBillsData, salesData, dailySalesData,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

module.exports = { getHomeScreenData }