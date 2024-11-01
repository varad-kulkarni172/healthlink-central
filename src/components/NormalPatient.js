import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';
import logo from '../images/logo.png';

const NormalPatient = () => {

    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ name: '', time: '' });
    const [postponedAppointments, setPostponedAppointments] = useState([]);
    const [completedAppointments, setCompletedAppointments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/appointments')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const [medicalRecords, setMedicalRecords] = useState([]);
    const [newMedicalRecord, setNewMedicalRecord] = useState({ date: '', name: '', result: '' });

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/medical-records');
                setMedicalRecords(response.data);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        fetchMedicalRecords();
    }, []);

    const handleAddMedicalRecord = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/medical-records', newMedicalRecord);
            setMedicalRecords([...medicalRecords, response.data]);
            setNewMedicalRecord({ date: '', name: '', result: '' });
        } catch (error) {
            console.error('Error adding medical record:', error);
        }
    };

    const handleDeleteMedicalRecord = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/medical-records/${id}`);
            setMedicalRecords(medicalRecords.filter(record => record.id !== id));
        } catch (error) {
            console.error('Error deleting medical record:', error);
        }
    };

    const handleMedicalRecordInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedicalRecord({ ...newMedicalRecord, [name]: value });
    };



    const [medicalBills, setMedicalBills] = useState([]);
    const [newMedicalBill, setNewMedicalBill] = useState({ date: '', name: '', amount: '' });

    const handleAddMedicalBill = async () => {
        console.log(newMedicalBill);
        try {
            const response = await axios.post('http://localhost:5001/api/medical-bills', newMedicalBill);
            setMedicalBills([...medicalBills, response.data]);
            setNewMedicalBill({ date: '', name: '', amount: '' });
        } catch (error) {
            console.error('Error adding medical bill:', error);
        }
    };

    useEffect(() => {
        const fetchMedicalBills = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/medical-bills');
                setMedicalBills(response.data);
            } catch (error) {
                console.error('Error fetching medical bills:', error);
            }
        };
        fetchMedicalBills();
    }, []);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/medications');
                setMedications(response.data);
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        };
        fetchMedications();
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/reports');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching Reports:', error);
            }
        };
        fetchReports();
    }, []);

    const handleDeleteMedicalBill = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/medical-bills/${id}`);
            setMedicalBills(medicalBills.filter((bill) => bill.id !== id));
        } catch (error) {
            console.error('Error deleting medical bill:', error);
        }
    };

    const [medications, setMedications] = useState([]);
    const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', condition: '' });


    const [reports, setReports] = useState([]);
    const [file, setFile] = useState(null);
    const [reportName, setReportName] = useState('');

    const handleScroll = () => {
        const sections = [
            { ref: appointmentsRef, id: 'Appointment' },
            { ref: medicalrecordsRef, id: 'MedicalRecords' },
            { ref: medicalbillsRef, id: 'MedicalBills' },
            { ref: medicationsRef, id: 'Medications' },
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

    const handleUploadReport = async (e) => {
        e.preventDefault();
        if (file && reportName) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', reportName);

            const token = localStorage.getItem('token'); // Retrieve the token

            try {
                const response = await axios.post('http://localhost:5001/api/reports', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`, // Include the token
                    },
                });
                setReports((prev) => [...prev, response.data]);
                setReportName('');
                setFile(null);
            } catch (error) {
                console.error('Error uploading report:', error);
                alert('Error uploading report: ' + error.response?.data?.error || error.message);
            }
        } else {
            alert("Please select a file and provide a report name.");
        }
    };


    const handleDeleteReport = async (id) => {

        const token = localStorage.getItem('token'); // Retrieve the token

        try {
            await axios.delete(`http://localhost:5001/api/reports/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Make sure to include the token if needed
                },
            });
            // Update the state to remove the deleted report
            const updatedReports = reports.filter(report => report.id !== id);
            setReports(updatedReports);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };
    


    const handleAddMedication = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/medications', newMedication);
            setMedications([...medications, response.data]);
            setNewMedication({ name: '', dosage: '', frequency: '', condition: '' });
        } catch (error) {
            console.error('Error adding medication:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteMedication = async (id) => {
        try {
            console.log('Attempting to delete medication with ID:', id);
            const response = await axios.delete(`http://localhost:5001/api/medications/${id}`);
            console.log('Delete response status:', response.status);
            
            // Update the medications state after successful deletion
            setMedications(prevMedications => prevMedications.filter(medication => medication.id !== id));
        } catch (error) {
            // Log error details
            console.error('Error deleting medication:', error.response ? error.response.data : error.message);
            console.error('Full error object:', error);
        }
    };
    
    

    const handleMedicationInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedication({ ...newMedication, [name]: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({ ...newAppointment, [name]: value });
    };

    const handleMedicalBillInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedicalBill({ ...newMedicalBill, [name]: value });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleAddAppointment = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/appointments', newAppointment);
            setAppointments([...appointments, response.data]);
            setNewAppointment({ name: '', time: '' });
        } catch (err) {
            console.error('Error adding appointment:', err);
        }
    };

    const handlePostponeAppointment = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/appointments/postpone/${id}`);
            setAppointments(appointments.filter(app => app.id !== id));
            setPostponedAppointments([...postponedAppointments, response.data]);
        } catch (err) {
            console.error('Error postponing appointment:', err);
        }
    };


    const handleCompleteAppointment = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/appointments/complete/${id}`);
            setAppointments(appointments.filter(app => app.id !== id));
            setCompletedAppointments([...completedAppointments, response.data]);
        } catch (err) {
            console.error('Error completing appointment:', err);
        }
    };



    const handleDeleteCompletedAppointment = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/appointments/${id}`);
            setCompletedAppointments(completedAppointments.filter(app => app.id !== id));
        } catch (err) {
            console.error('Error deleting appointment:', err);
        }
    };



    const handleMoveUpPostponedAppointment = (id) => {
        const appointment = postponedAppointments.find((app) => app.id === id);
        setPostponedAppointments(postponedAppointments.filter((app) => app.id !== id));
        setAppointments([...appointments, { ...appointment, status: 'Pending' }]);
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Appointments');

    const appointmentsRef = useRef(null);
    const medicalrecordsRef = useRef(null);
    const medicalbillsRef = useRef(null);
    const medicationsRef = useRef(null);
    const reportsRef = useRef(null);

    const handleLogout = () => {
        navigate("/login");
    };

    const handleScrollToSection = (section) => {
        setActiveTab(section);

        switch (section) {
            case 'Appointments':
                appointmentsRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'MedicalRecords':
                medicalrecordsRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'MedicalBills':
                medicalbillsRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Medications':
                medicationsRef.current.scrollIntoView({ behavior: 'smooth' });
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
                            onClick={() => handleScrollToSection('Appointment')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'Appointment' ? styles.activeNavItem : {}),
                            }}
                        >
                            Appointments
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => handleScrollToSection('MedicalRecords')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'MedicalRecords' ? styles.activeNavItem : {}),
                            }}
                        >
                            Medical Records
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => handleScrollToSection('MedicalBills')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'MedicalBills' ? styles.activeNavItem : {}),
                            }}
                        >
                            Medical Bills
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => handleScrollToSection('Medications')}
                            style={{
                                ...styles.navItem,
                                ...(activeTab === 'Medications' ? styles.activeNavItem : {}),
                            }}
                        >
                            Medications
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
                            <Link to="/normalpatient" style={styles.navItem}>Profile</Link>
                        </li>
                        <li>
                            <Link to="/normalpatient" style={styles.navItem}>Settings</Link>
                        </li>
                        <li style={styles.navItem} onClick={handleLogout}><FiLogOut /> Log Out</li>
                    </ul>
                </div>
            </nav>

            <main style={styles.mainContent}>
                <section style={styles.schedulerSection} ref={appointmentsRef}>
                    <h2>Scheduler</h2>
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
                <section style={styles.schedulerSection} ref={medicalrecordsRef}>
                    <h3>Add New Medical Record</h3>
                    <div className="input-group">
                        <input
                            type="date"
                            name="date"
                            value={newMedicalRecord.date}
                            onChange={handleMedicalRecordInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Record Name"
                            value={newMedicalRecord.name}
                            onChange={handleMedicalRecordInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="result"
                            placeholder="Result"
                            value={newMedicalRecord.result}
                            onChange={handleMedicalRecordInputChange}
                            style={styles.input}
                        />
                        <button onClick={handleAddMedicalRecord} style={styles.button}>Add Record</button>
                    </div>

                    <h3>Records List</h3>
                    <ul className="medical-record-list">
                        {medicalRecords.map(record => (
                            <li key={record.id} className="medical-record-item">
                                <span>{record.date} - {record.name}: {record.result}</span>
                                <button onClick={() => handleDeleteMedicalRecord(record.id)} style={styles.button}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section style={styles.schedulerSection} ref={medicalbillsRef}>
                    <h2>Medical Bills</h2>
                    <div>
                        <input type="date" name="date" value={newMedicalBill.date} onChange={handleMedicalBillInputChange} style={styles.input} placeholder="Date" />
                        <input type="text" name="name" value={newMedicalBill.name} onChange={handleMedicalBillInputChange} style={styles.input} placeholder="Name" />
                        <input type="text" name="amount" value={newMedicalBill.amount} onChange={handleMedicalBillInputChange} style={styles.input} placeholder="Amount" />
                        <button onClick={handleAddMedicalBill} style={styles.button}>Add Bill</button>
                    </div>
                    <ul className="medical-bill-list">
                        {medicalBills.map(bill => (
                            <li key={bill.id} style={styles.appointmentItem}>
                                {bill.date} - {bill.name} - ₹{bill.amount}
                                <button onClick={() => handleDeleteMedicalBill(bill.id)} style={styles.button}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section style={styles.schedulerSection} ref={medicationsRef}>
                    <h2>Medications</h2>
                    <div>
                        <input type="text" name="name" value={newMedication.name} onChange={handleMedicationInputChange} style={styles.input} placeholder="Medicine Name" />
                        <input type="text" name="dosage" value={newMedication.dosage} onChange={handleMedicationInputChange} style={styles.input} placeholder="Dosage" />
                        <input type="text" name="frequency" value={newMedication.frequency} onChange={handleMedicationInputChange} style={styles.input} placeholder="Frequency" />
                        <input type="text" name="condition" value={newMedication.condition} onChange={handleMedicationInputChange} style={styles.input} placeholder="Condition" />
                        <button onClick={handleAddMedication} style={styles.button}>Add Medication</button>
                    </div>
                    <ul className="medication-list">
                        {medications.map(medication => (
                            <li key={medication.id} style={styles.appointmentItem}>
                                {medication.name} - {medication.dosage} - {medication.frequency} - For {medication.condition}
                                <button onClick={() => handleDeleteMedication(medication.id)} style={styles.button}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section ref={reportsRef} style={styles.schedulerSection}>
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
                                            <a
                                                href={`http://localhost:5001/${report.filePath}`} // Adjust this to point correctly
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={styles.downloadLink}
                                            >
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

const styles = {
    dashboardContainer: {
        display: 'flex',
        height: '100vh',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f0f4f7',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#0da186',
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
        padding: '70px',
        backgroundColor: '#fff',
        overflowY: 'scroll',
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
    fileInput: {
        margin: '5px 0',
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
        cursor: 'pointer',
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
        marginLeft: '25px',
    },
    medicalRecordsContainer: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    medicalRecordList: {
        listStyle: 'none',
        padding: '0',
    },
    medicalRecordItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    medicalRecordInput: {
        marginRight: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: 'calc(100% - 22px)',
    },
    addButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    medicalBillsContainer: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    medicalBillList: {
        listStyle: 'none',
        padding: '0',
    },
    medicalBillItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    medicalBIllInput: {
        marginRight: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: 'calc(100% - 22px)',
    },

    // Responsive design
    '@media (max-width: 768px)': {
        dashboardContainer: {
            flexDirection: 'column',
        },
        sidebar: {
            width: '100%',
            padding: '10px',
            textAlign: 'center',
        },
        mainContent: {
            padding: '20px',
        },
        logo: {
            margin: '0 auto',
        },
        navItem: {
            justifyContent: 'center',
        },
        formContainer: {
            flexDirection: 'column',
        },
        button: {
            width: '100%',
            margin: '10px 0',
        },
        appointmentCard: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    '@media (max-width: 480px)': {
        dashboardContainer: {
            height: 'auto',
        },
        sidebar: {
            padding: '5px',
        },
        mainContent: {
            padding: '10px',
        },
        logo: {
            width: '80px',
            marginBottom: '10px',
        },
        navItem: {
            padding: '8px',
        },
        formContainer: {
            flexDirection: 'column',
        },
        input: {
            width: '100%',
            marginBottom: '10px',
        },
        button: {
            width: '100%',
            marginBottom: '10px',
        },
        reportItem: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        deleteButton: {
            width: '100%',
            margin: '10px 0 0 0',
        },
        uploadSection: {
            padding: '10px',
        },
        medicalRecordInput: {
            width: '100%',
            marginBottom: '10px',
        },
        addButton: {
            width: '100%',
        },
    },
};


export default NormalPatient;