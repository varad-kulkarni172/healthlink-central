import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi'; // Icons for log out, profile, settings
import logo from '../images/logo.png';

// Assuming you have a logo.png file in your project

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    return (
        <div style={styles.dashboardContainer}>
            {/* Sidebar Navigation */}
            <nav style={styles.sidebar}>
                {/* Logo at the top */}
                <div style={styles.logoContainer}>
                <img src={logo} alt="Logo" style={styles.logo} />
                </div>

                <ul style={styles.navList}>
                    <li><Link to="/dashboard" style={styles.navItem}>Dashboard</Link></li>
                    <li><Link to="/scheduler" style={styles.navItem}>Scheduler</Link></li>
                    <li><Link to="/outpatient" style={styles.navItem}>OutPatient</Link></li>
                    <li><Link to="/inpatient" style={styles.navItem}>InPatient</Link></li>
                    <li><Link to="/doctor" style={styles.navItem}>Doctor</Link></li>
                    <li><Link to="/reports" style={styles.navItem}>Reports</Link></li>
                    <li><Link to="/accounting" style={styles.navItem}>Accounting</Link></li>
                    <li><Link to="/settings" style={styles.navItem}>Settings</Link></li>
                </ul>

                {/* Bottom Menu: Profile, Settings, and Logout */}
                <div style={styles.bottomNav}>
                    <ul style={styles.navList}>
                        <li><Link to="/profile" style={styles.navItem}><FiUser /> Profile</Link></li>
                        <li><Link to="/settings" style={styles.navItem}><FiSettings /> Settings</Link></li>
                        <li><Link to="/logout" style={styles.navItem}><FiLogOut /> Log Out</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div style={styles.metricsContainer}>
                        <div style={styles.metricCard}>1 Waiting to Consult</div>
                        <div style={styles.metricCard}>6 Appointments For Next One Month</div>
                        <div style={styles.metricCard}>40 Total Prescribed Count</div>
                        <div style={styles.metricCard}>0 Appointments for Tomorrow</div>
                    </div>
                </header>

                {/* Charts Section */}
                <section style={styles.chartsSection}>
                    <div style={styles.chartContainer}>
                        <h3>Total and Follow-up Patients Graph (Last 12 Months)</h3>
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                    <div style={styles.pieChartContainer}>
                        <h3>Patient Statistics</h3>
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                </section>
            </main>
        </div>
    );
};

// Bar Chart Data (New vs Follow-up Patients)
const barChartData = {
    labels: ['Aug 2021', 'Sep 2021', 'Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Jul 2022', 'Aug 2022'],
    datasets: [
        {
            label: 'New Patients',
            data: [1, 0, 1, 1, 0, 2, 4, 0, 3, 0, 0, 0, 1],
            backgroundColor: 'red',
        },
        {
            label: 'Follow-up Patients',
            data: [2, 0, 0, 0, 0, 8, 12, 10, 5, 3, 3, 1, 3],
            backgroundColor: 'blue',
        }
    ]
};

const barChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'New vs Follow-up Patients',
        },
    },
};

// Pie Chart Data (Patient Statistics)
const pieChartData = {
    labels: ['Follow-up Patients', 'New Patients', 'In Patients', 'IP Strength'],
    datasets: [
        {
            data: [32, 4, 8, 2],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }
    ]
};

const pieChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Patient Statistics',
        },
    },
};

const styles = {
    dashboardContainer: {
        display: 'flex',
        height: '100vh',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f0f4f7',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#0d47a1',
        padding: '20px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // To push bottom menu to the bottom
    },
    logoContainer: {
        textAlign: 'right',
        marginBottom: '20px',
    },
    logo: {
        width: '120px',
        marginBottom: '20px',
    },
    navList: {
        listStyleType: 'none',
        padding: 0,
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        padding: '10px 0',
        textDecoration: 'none',
        borderBottom: '2px solid transparent', // White strip effect
        transition: 'border-bottom 0.3s',
    },
    navItemHovered: {
        borderBottom: '2px solid #fff', // On hover, add white strip
    },
    navItemIcon: {
        marginRight: '10px',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#fff',
        overflowY: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    metricsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    metricCard: {
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '22%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    chartsSection: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    chartContainer: {
        width: '60%',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    pieChartContainer: {
        width: '30%',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    bottomNav: {
        paddingTop: '20px',
        borderTop: '1px solid #fff',
    },
};

export default Dashboard;
