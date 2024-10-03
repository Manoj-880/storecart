import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import {hemoScreenData} from '../api_calls/homescreen_api';

// Register chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate();
    let [profitsData, setProfitsData] = useState({});
    let [salesData, setSalesData] = useState({});
    let [stock, setStock] = useState([]);
    let [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchHomescreenData = async () => {
            let homeData = await hemoScreenData(1);
            
            setProfitsData({
                today: homeData.data.salesData[0].todays_sales,
                yesterday: homeData.data.salesData[0].yesterdays_sales,
                thisWeek: homeData.data.salesData[0].this_week_sales,
                lastWeek: homeData.data.salesData[0].last_week_sales,
                thisMonth: homeData.data.salesData[0].this_month_sales,
                lastMonth: homeData.data.salesData[0].last_month_sales,
            });

            const initialStock = homeData.data.stockData
            const sortedStock = initialStock.sort((a, b) => a.available - b.available);
                setStock(sortedStock);

            const dates = homeData.data.dailySalesData.map((entry) => {
                const date = new Date(entry.sales_date);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;  // Format to DD/MM/YYYY
            });
            
            const amounts = homeData.data.dailySalesData.map((entry) => entry.daily_sales);

            setSalesData({
                date: dates,
                amount: amounts,
            });

            const billsData = homeData.data.recentBillsData;
            setBills(billsData);

            return homeData.data;
        }

        fetchHomescreenData();
    }, [setProfitsData]);

    let formatAmount = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return 'Invalid input';
        }

        let integerPart = Math.floor(amount).toString();
        let decimalPart = (amount % 1).toFixed(2).slice(2); // Get decimal part (two digits)

        let result = '';

        let initialDigits = integerPart.length % 2 === 0 ? integerPart.slice(0, 2) : integerPart.slice(0, 1);
        result = initialDigits;

        for (let i = initialDigits.length; i < integerPart.length; i += 2) {
            result += ',' + integerPart.slice(i, i + 2);
        }

        return result + '.' + decimalPart;
    }

    const chartData = {
        labels: salesData.date,
        datasets: [
            {
                label: 'Profit',
                data: salesData.amount,
                fill: false,
                borderColor: '#007BFF',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.4,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Period',
                },
                grid: {
                    display: false,
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount (₹)',
                },
                beginAtZero: true,
                grid: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                display: true,
                align: 'top',
                color: 'black',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return `₹${value}`;
                },
            }
        },
    };

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <div className="dashboard col-sm-12">
            <div className="details col-sm-12 col-md-7">
                <div className="profit-data col-sm-12">
                    <div className="profit col-sm-12 col-md-4">
                        <p className="profit-head">Today's Profit</p>
                        <p className="amount">{formatAmount(profitsData.today)} <span style={{ color: profitsData.today < profitsData.yesterday ? 'red' : 'green' }}>{profitsData.today < profitsData.yesterday ? <SouthIcon fontSize='small'/> : <NorthIcon fontSize='small'/>}</span></p>
                    </div>
                    <div className="profit col-sm-12 col-md-4">
                        <p className="profit-head">This week's Profit</p>
                        <p className="amount">{formatAmount(profitsData.thisWeek)} <span style={{ color: profitsData.thisWeek < profitsData.lastWeek ? 'red' : 'green' }}>{profitsData.thisWeek < profitsData.lastWeek? <SouthIcon fontSize='small'/> : <NorthIcon fontSize='small'/>}</span></p>
                    </div>
                    <div className="profit col-sm-12 col-md-4">
                        <p className="profit-head">This Month's Profit</p>
                        <p className="amount">{formatAmount(profitsData.thisMonth)} <span style={{ color: profitsData.thisMonth < profitsData.lastMonth  ? 'red' : 'green' }}>{profitsData.thisMonth < profitsData.lastMonth ? <SouthIcon fontSize='small'/> : <NorthIcon fontSize='small'/>}</span></p>
                    </div>
                </div>
                <div className="sales-chart col-sm-12">
                    <h3>Daily Sales</h3>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
            <div className="profit-table-data col-sm-12 col-md-4">
                <div className="stock-data">
                    <div className="profit-table-head">
                        <p className="head">Stock alert</p>
                        <p className="link" onClick={() => handleNavigate('/stock')}>View inventory</p>
                    </div>
                    <div className="profile-table-content">
                        <div className="profile-table-content">
                            <table className="table custom-table">
                                <tbody>
                                    {stock.map((item, index) => (
                                        <tr key={index}>
                                            <td>{`${item.product_name} - ₹${item.price}.00`}</td>
                                            <td style={{textAlign: 'end'}}>{item.available} <span style={{ color: item.available > 10 ? 'Yellow' : 'red'}}> <FiberManualRecordIcon/></span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="stock-data">
                    <div className="profit-table-head">
                        <p className="head">Recent Bills</p>
                        <p className="link" onClick={() => handleNavigate('/bills')}>View bills</p>
                    </div>
                    <div className="profile-table-content">
                        <div className="profile-table-content">
                            <table className="table custom-table">
                                <tbody>
                                    {bills.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.bills_id}</td>
                                            <td>{item.customer_name}</td>
                                            <td>{item.total_price_sum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
