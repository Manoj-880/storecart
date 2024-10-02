const db = require('../utils/dbConfig');

const stockAlertQuery = async (id) => {
    try {
        const query = 'select product_name, price, available from products where store_id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows;
    } catch (error) {
        return "Database Error: "+ error.message;
    };
};

const getRecentBillsQuery = async (id) => {
    try {
        const query = 'SELECT b.bills_id, c.customer_name, SUM(b.total_price) AS total_price_sum FROM bills b JOIN customers c ON b.customer_id = c.customer_id WHERE b.store_id = ? GROUP BY b.bills_id, c.customer_name';
        const [rows] = await db.promise().query(query, [id]);
        return rows;
    } catch (error) {
        return "Database Error: "+ error.message;
    };
};

const getSalesDataQuery = async (id) => {
    try {
        const query = 'SELECT SUM(CASE WHEN DATE(created_at) = CURDATE() THEN total_price ELSE 0 END) AS todays_sales, SUM(CASE WHEN DATE(created_at) = CURDATE() - INTERVAL 1 DAY THEN total_price ELSE 0 END) AS yesterdays_sales, SUM(CASE WHEN YEARWEEK(DATE(created_at), 1) = YEARWEEK(CURDATE(), 1) THEN total_price ELSE 0 END) AS this_week_sales, SUM(CASE WHEN YEARWEEK(DATE(created_at), 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1) THEN total_price ELSE 0 END) AS last_week_sales, SUM(CASE WHEN YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE()) THEN total_price ELSE 0 END) AS this_month_sales, SUM(CASE WHEN YEAR(created_at) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(created_at) = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_price ELSE 0 END) AS last_month_sales FROM bills where store_id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows;
    } catch (error) {
        return "Database Error: "+ error.message;
    };
};

const getDailySalesQuery = async (id) => {
    try {
        const query = 'SELECT  DATE(created_at) AS sales_date, SUM(total_price) AS daily_sales FROM bills WHERE store_id = ? AND created_at >= CURDATE() - INTERVAL 1 MONTH GROUP BY DATE(created_at) ORDER BY sales_date';
        const [rows] = await db.promise().query(query, [id]);
        return rows;
    } catch (error) {
        return "Databas Error: " + error.message;
    };
};

module.exports = {
    stockAlertQuery,
    getRecentBillsQuery,
    getSalesDataQuery,
    getDailySalesQuery,
}