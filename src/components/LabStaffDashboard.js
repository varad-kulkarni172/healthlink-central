import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import chart.js automatically for chart rendering

const LabStaffDashboard = () => {
    // Dummy data for vitals and prescriptions
    const vitals = {
        heartRate: [65, 70, 72, 68, 75, 78],
        oxygenLevels: [98, 97, 96, 95, 98, 99],
        timestamps: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    };

    const prescriptions = [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times a day' },
        { name: 'Ciprofloxacin', dosage: '250mg', frequency: 'Twice a day' },
        { name: 'Paracetamol', dosage: '500mg', frequency: 'When needed' },
    ];

    return (
        <div style={styles.labDashboard}>
            <h2 style={styles.heading}>Lab Staff Dashboard</h2>

            {/* Patient Vitals */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Patient Vitals</h3>
                <div style={styles.chartContainer}>
                    <h4 style={styles.chartTitle}>Heart Rate</h4>
                    <Line
                        data={{
                            labels: vitals.timestamps,
                            datasets: [
                                {
                                    label: 'Heart Rate (bpm)',
                                    data: vitals.heartRate,
                                    fill: false,
                                    borderColor: 'rgba(75,192,192,1)',
                                    tension: 0.1,
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: false,
                                },
                            },
                        }}
                    />
                </div>

                <div style={styles.chartContainer}>
                    <h4 style={styles.chartTitle}>Oxygen Levels</h4>
                    <Line
                        data={{
                            labels: vitals.timestamps,
                            datasets: [
                                {
                                    label: 'Oxygen Levels (%)',
                                    data: vitals.oxygenLevels,
                                    fill: false,
                                    borderColor: 'rgba(54,162,235,1)',
                                    tension: 0.1,
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: false,
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Prescriptions */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Patient Prescriptions</h3>
                <ul style={styles.prescriptionList}>
                    {prescriptions.map((prescription, index) => (
                        <li key={index} style={styles.prescriptionItem}>
                            <strong>{prescription.name}</strong> - {prescription.dosage} ({prescription.frequency})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    labDashboard: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    },
    heading: {
        fontSize: '2em',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    section: {
        marginBottom: '40px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        fontSize: '1.5em',
        marginBottom: '20px',
        color: '#555',
    },
    chartContainer: {
        marginBottom: '30px',
    },
    chartTitle: {
        fontSize: '1.2em',
        marginBottom: '10px',
        color: '#666',
    },
    prescriptionList: {
        listStyleType: 'none',
        padding: 0,
    },
    prescriptionItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        color: '#555',
    },
};

export default LabStaffDashboard;