import React, { useState, useEffect } from 'react';
import productData from './product.json'; // Assuming you have a product.json file

const PharmacyDashboard = () => {
    const [prescriptions, setPrescriptions] = useState([
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice a day' },
        { name: 'Ibuprofen', dosage: '200mg', frequency: 'Once every 8 hours' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [alternativeMedicine, setAlternativeMedicine] = useState('');

    // Simulated barcode scan result
    const [scannedPrescription, setScannedPrescription] = useState('');

    // Handle search for medicines
    const handleSearch = (query) => {
        const filteredProducts = productData.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredProducts);
    };

    // Simulate barcode scanning
    const handleScanPrescription = () => {
        // Simulate a scanned prescription result
        setScannedPrescription('Prescription Scanned: Amoxicillin 500mg');
    };

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <div style={styles.pharmacyDashboard}>
            <h2 style={styles.heading}>Pharmacy Dashboard</h2>

            {/* Scanned Prescription */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Scanned Prescription</h3>
                <button onClick={handleScanPrescription} style={styles.scanButton}>
                    Scan Prescription (Simulate)
                </button>
                {scannedPrescription && <p style={styles.scannedText}>{scannedPrescription}</p>}
            </div>

            {/* Prescriptions List */}
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

            {/* Alternative Medicine Input */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Suggest Alternative Medicines</h3>
                <input
                    type="text"
                    placeholder="Suggest an alternative medicine"
                    value={alternativeMedicine}
                    onChange={(e) => setAlternativeMedicine(e.target.value)}
                    style={styles.inputBox}
                />
                <p style={styles.alternativeText}>
                    {alternativeMedicine && `Suggested Alternative: ${alternativeMedicine}`}
                </p>
            </div>

            {/* Medicine Search */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Search for Medicines</h3>
                <input
                    type="text"
                    placeholder="Search medicines"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.inputBox}
                />
                {searchResults.length > 0 && (
                    <ul style={styles.searchResults}>
                        {searchResults.map((result, index) => (
                            <li key={index} style={styles.searchResultItem}>
                                <img src={result.image} alt={result.name} style={styles.productImage} />
                                <div style={styles.productDetails}>
                                    <span>{result.name}</span>
                                    <span>{result.price} $</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const styles = {
    pharmacyDashboard: {
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
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        fontSize: '1.5em',
        marginBottom: '15px',
        color: '#555',
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
    inputBox: {
        width: '100%',
        padding: '10px',
        fontSize: '1em',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
    },
    alternativeText: {
        color: '#777',
        marginTop: '10px',
    },
    scanButton: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    scannedText: {
        marginTop: '10px',
        fontSize: '1em',
        color: '#333',
    },
    searchResults: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '10px',
    },
    searchResultItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        color: '#555',
    },
    productImage: {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
};

export default PharmacyDashboard;
