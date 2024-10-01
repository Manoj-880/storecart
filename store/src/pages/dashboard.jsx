import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

// Register chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate();
    let [profitsData, setProfitsData] = useState({});
    let [salesData, setSalesData] = useState({});
    let [stock, setStock] = useState([]);
    let [bills, setBills] = useState([]);

    useEffect(() => {
        setProfitsData({
            today: 8243,
            yesterday: 6515,
            thisWeek: 15861,
            lastWeek: 65153,
            thisMonth: 122587,
            lastMonth: 681968,
        });
        setSalesData({
            date: ['01/10/2024', '02/10/2024', '03/10/2024', '04/10/2024', '05/10/2024'],
            amount: [60845, 70000, 65412, 102500, 40528],
        });
        setBills([
            {bill_id: 'SC0025', customer: 'Name 1', aount: 216},
            {bill_id: 'SC0024', customer: 'Name 2', aount: 5000},
            {bill_id: 'SC0023', customer: 'Name 3', aount: 581},
            {bill_id: 'SC0022', customer: 'Name 4', aount: 158},
            {bill_id: 'SC0021', customer: 'Name 5', aount: 65},
        ])
        const initialStock = [
            { productName: "Clinic +", available: 40 },
            { productName: "Coalgate", available: 10 },
            { productName: "Santoor", available: 5 },
            { productName: "Toordall", available: 20 },
            { productName: "Plain note book", available: 2 },
        ]
        const sortedStock = initialStock.sort((a, b) => a.available - b.available);
            setStock(sortedStock);
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
                                            <td>{item.productName}</td>
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
                                            <td>{item.bill_id}</td>
                                            <td>{item.customer}</td>
                                            <td>{item.amount}</td>
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
