import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiLogOut } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';
import logo from '../images/logo.png';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {

    const [appointments, setAppointments] = useState([
        { id: 1, name: 'John Doe', time: '10:00 AM', status: 'Pending' },
        { id: 2, name: 'Jane Smith', time: '11:30 AM', status: 'Pending' },
    ]);

    const [newAppointment, setNewAppointment] = useState({ name: '', time: '' });
    const [postponedAppointments, setPostponedAppointments] = useState([]);
    const [completedAppointments, setCompletedAppointments] = useState([]);

    const [reports, setReports] = useState([]); // To store uploaded reports
    const [file, setFile] = useState(null); // To handle file input
    const [reportName, setReportName] = useState(''); // To name the report

    const handleScroll = () => {
        const sections = [
            { ref: dashboardRef, id: 'Dashboard' },
            { ref: schedulerRef, id: 'Scheduler' },
            { ref: reportsRef, id: 'Reports' },
        ];

        const scrollPosition = window.scrollY;

        sections.forEach(({ ref, id }) => {
            if (ref.current) {
                const sectionTop = ref.current.getBoundingClientRect().top + window.scrollY;
                const sectionBottom = sectionTop + ref.current.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setActiveTab(id);
                }
            }
        });
    };

    const handleUploadReport = (e) => {
        e.preventDefault();
        if (file && reportName) {
            const newReport = {
                id: reports.length + 1,
                name: reportName,
                file: URL.createObjectURL(file),
            };
            setReports((prev) => [...prev, newReport]);
            setReportName('');
            setFile(null);
        } else {
            alert("Please select a file and provide a report name.");
        }
    };

    const handleDeleteReport = (id) => {
        const updatedReports = reports.filter(report => report.id !== id);
        setReports(updatedReports);
    };


    // Effect to add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleAddAppointment = () => {
        setAppointments([
            ...appointments,
            { id: appointments.length + 1, name: newAppointment.name, time: newAppointment.time, status: 'Pending' },
        ]);
        setNewAppointment({ name: '', time: '' });
    };

    const handlePostponeAppointment = (id) => {
        const appointment = appointments.find((app) => app.id === id);
        setAppointments(appointments.filter((app) => app.id !== id));
        setPostponedAppointments([...postponedAppointments, { ...appointment, status: 'Postponed' }]);
    };

    const handleCompleteAppointment = (id) => {
        const appointment = appointments.find((app) => app.id === id);
        setAppointments(appointments.filter((app) => app.id !== id));
        setCompletedAppointments([...completedAppointments, { ...appointment, status: 'Completed' }]);
    };

    // Function to delete a completed appointment
    const handleDeleteCompletedAppointment = (id) => {
        setCompletedAppointments(completedAppointments.filter((app) => app.id !== id));
    };

    // Function to move a postponed appointment back to upcoming
    const handleMoveUpPostponedAppointment = (id) => {
        const appointment = postponedAppointments.find((app) => app.id === id);
        setPostponedAppointments(postponedAppointments.filter((app) => app.id !== id));
        setAppointments([...appointments, { ...appointment, status: 'Pending' }]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({ ...newAppointment, [name]: value });
    };



    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Dashboard');

    const dashboardRef = useRef(null);
    const schedulerRef = useRef(null);
    const reportsRef = useRef(null);


    const handleLogout = () => {
        navigate("/login");
    };

    const handleScrollToSection = (section) => {
        setActiveTab(section);

        switch (section) {
            case 'Dashboard':
                dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Scheduler':
                schedulerRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Reports':
                reportsRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            default:
                break;
        }
    };

    return (
        <div style={styles.dashboardContainer}>
            <nav style={styles.sidebar}>
                <div style={styles.logoContainer}>
                    <img src={logo} alt="Logo" style={styles.logo} />
                </div>

                <ul style={styles.navList}>
                    <li>
                        <span
                            onClick={() => handleScrollToSection('Dashboard')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'Dashboard' ? styles.activeNavItem : {}),
                            }}
                        >
                            Dashboard
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => handleScrollToSection('Scheduler')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'Scheduler' ? styles.activeNavItem : {}),
                            }}
                        >
                            Scheduler
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => handleScrollToSection('Reports')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'Reports' ? styles.activeNavItem : {}),
                            }}
                        >
                            Reports
                        </span>
                    </li>
                </ul>

                <div style={styles.bottomNav}>
                    <ul style={styles.navList}>
                        <li>
                            <Link to="/dashboard" style={styles.navItem}>Profile</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" style={styles.navItem}>Settings</Link>
                        </li>
                        <li style={styles.navItem} onClick={handleLogout}><FiLogOut /> Log Out</li>
                    </ul>
                </div>
            </nav>

            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div style={styles.metricsContainer} ref={dashboardRef}>
                        <div style={styles.metricCard}>1 Waiting to Consult</div>
                        <div style={styles.metricCard}>40 Total Prescribed Count</div>
                        <div style={styles.metricCard}>0 Appointments for Tomorrow</div>
                    </div>
                </header>

                {/* Scheduler section */}
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
                <section style={styles.schedulerSection} ref={schedulerRef}>
                    <h2>Scheduler</h2>
                    {/* Add new appointment */}
                    <div>
                        <h3>Add New Appointment</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Patient Name"
                            value={newAppointment.name}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="time"
                            placeholder="Appointment Time"
                            value={newAppointment.time}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <button onClick={handleAddAppointment} style={styles.button}>Add Appointment</button>
                    </div>

                    {/* Upcoming appointments */}
                    <div>
                        <h3>Upcoming Appointments</h3>
                        <ul>
                            {appointments.map((appointment) => (
                                <li key={appointment.id} style={styles.appointmentItem}>
                                    {appointment.name} - {appointment.time} - {appointment.status}
                                    <button onClick={() => handleCompleteAppointment(appointment.id)} style={styles.button}>
                                        Done with Appointment
                                    </button>
                                    <button onClick={() => handlePostponeAppointment(appointment.id)} style={styles.button}>
                                        Postpone
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Completed appointments */}
                    <div>
                        <h3>Completed Appointments</h3>
                        <ul>
                            {completedAppointments.map((appointment) => (
                                <li key={appointment.id} style={styles.appointmentItem}>
                                    {appointment.name} - {appointment.time} - {appointment.status}
                                    <button onClick={() => handleDeleteCompletedAppointment(appointment.id)} style={styles.button}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Postponed appointments */}
                    <div>
                        <h3>Postponed Appointments</h3>
                        <ul>
                            {postponedAppointments.map((appointment) => (
                                <li key={appointment.id} style={styles.appointmentItem}>
                                    {appointment.name} - {appointment.time} - {appointment.status}
                                    <button onClick={() => handleMoveUpPostponedAppointment(appointment.id)} style={styles.button}>
                                        <FaArrowUp />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Reports section */}
                <section ref={reportsRef} style={styles.section}>
                    <h2>Reports</h2>
                    <div style={styles.uploadSection}>
                        <h3>Upload New Report</h3>
                        <form onSubmit={handleUploadReport}>
                            <input
                                type="text"
                                placeholder="Report Name"
                                value={reportName}
                                onChange={(e) => setReportName(e.target.value)}
                                style={styles.input}
                                required
                            />
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={styles.fileInput}
                                required
                            />
                            <button type="submit" style={styles.button}>Upload Report</button>
                        </form>
                    </div>
                    <div style={styles.reportList}>
                        <h3>Uploaded Reports</h3>
                        {reports.length > 0 ? (
                            <ul>
                                {reports.map((report) => (
                                    <li key={report.id} style={styles.reportItem}>
                                        <span>{report.name}</span>
                                        <div style={styles.reportActions}>
                                            <a href={report.file} target="_blank" rel="noopener noreferrer" style={styles.downloadLink}>
                                                View
                                            </a>
                                            <button onClick={() => handleDeleteReport(report.id)} style={styles.deleteButton}>
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reports uploaded yet.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};


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
        justifyContent: 'space-between',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    },
    logoContainer: {
        textAlign: 'right',
        marginBottom: '20px',
    },
    logo: {
        width: '120px',
        marginBottom: '20px',
        marginRight: '70px',
    },
    navList: {
        listStyleType: 'none',
        padding: 0,
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        padding: '10px',
        textDecoration: 'none',
        borderBottom: '2px solid transparent',
        transition: 'border-bottom 0.3s',
        cursor: 'pointer',
    },
    activeNavItem: {
        borderBottom: '9px solid black',
    },
    navItemHovered: {
        borderBottom: '9px solid #fff',
    },
    navItemIcon: {
        marginRight: '10px',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#fff',
        overflowY: 'scroll',
    },
    header: {
        display: 'flex',
        flexWrap: '20px',
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
        padding: '40px',
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
    schedulerSection: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    inputFocus: {
        borderColor: '#0d47a1',
    },

    buttonHover: {
        backgroundColor: '#063373',
    },
    appointmentList: {
        marginBottom: '20px',
    },
    appointmentCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
        animation: 'fadeIn 0.5s ease-in-out',
    },
    postponeButton: {
        backgroundColor: '#ff9800',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    postponedStatus: {
        color: '#ff5722',
        fontWeight: 'bold',
    },
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    appointmentItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#0d47a1',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    input: {
        marginRight: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    uploadSection: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
    },
    input: {
        margin: '5px 0',
        padding: '10px',
        width: 'calc(100% - 22px)',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    fileInput: {
        margin: '5px 0',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    reportList: {
        marginTop: '15px',
    },
    reportItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
    downloadLink: {
        color: '#007bff',
        textDecoration: 'none',
    },
    section: {
        marginTop: '20px',
    },
    deleteButton: {
        padding: '10px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '25px'
    },
};

export default Dashboard;
