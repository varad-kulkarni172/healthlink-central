import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t, i18n } = useTranslation();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#fffaf0',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '10px 20px',
        },
        title: {
            fontSize: '3rem',
            color: '#333',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 2,
            animation: 'float 5s infinite', // Adding the floating animation directly
        },
        button: {
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px',
            textDecoration: 'none',
            zIndex: 2,
        },
        linkContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            zIndex: 2,
        },
        languageButton: {
            position: 'absolute',
            top: '40px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 2,
        },
        dropdown: {
            position: 'absolute',
            top: '60px',
            right: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            display: dropdownVisible ? 'block' : 'none',
            zIndex: 2,
        },
        dropdownItem: {
            padding: '10px 20px',
            cursor: 'pointer',
        },
        '@media (max-width: 1024px)': {
            title: { fontSize: '2.5rem' },
            button: { fontSize: '0.9rem', padding: '8px 16px' },
            container: { padding: '15px' },
        },
        '@media (max-width: 600px)': {
            title: { fontSize: '2rem' },
            button: { fontSize: '0.8rem', padding: '6px 12px' },
            container: { padding: '20px', justifyContent: 'space-around' },
            linkContainer: { flexDirection: 'column', gap: '10px' },
        },
    };
    
    

    return (
        <div style={styles.container}>
            <h1 style={styles.title} className="floating-title">{t('Welcome')}</h1>
            <div style={styles.linkContainer}>
                <Link to="/login" style={styles.button}>{t('Login')}</Link>
                <Link to="/register" style={styles.button}>{t('Register')}</Link>
            </div>
            <button style={styles.languageButton} onClick={toggleDropdown}>
                Language
            </button>
            <div style={styles.dropdown}>
                <div style={styles.dropdownItem} onClick={() => changeLanguage('en')}>English</div>
                <div style={styles.dropdownItem} onClick={() => changeLanguage('hi')}>हिन्दी</div>
                <div style={styles.dropdownItem} onClick={() => changeLanguage('mar')}>मराठी</div>


            </div>

            <style>
{`
    /* Floating title animation */
    .floating-title {
        animation: float 5s ease-in-out infinite;
    }

    @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }

    /* Rain animation for medical objects */
    .medical-object {
        position: absolute;
        width: 50px;
        height: 50px;
        top: -100px; /* Start offscreen */
        animation: rain 10s linear infinite;
        opacity: 0.9; /* Slight transparency for a smooth effect */
    }

    @keyframes rain {
        0% { transform: translateY(-100px); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(110vh); opacity: 0; }
    }

    /* Specific styles for each object to randomize their horizontal positions and speed */
    .health-care { left: 10%; animation-duration: 15s; }
    .hospital { left: 30%; animation-duration: 12s; }
    .immunization { left: 50%; animation-duration: 14s; }
    .medical-care { left: 70%; animation-duration: 13s; }
    .medical-record { left: 90%; animation-duration: 11s; }
    .pill { left: 20%; animation-duration: 16s; }
    .products { left: 60%; animation-duration: 14s; }

    /* Responsive styling */
    @media (max-width: 1024px) {
        .floating-title {
            font-size: 2.5rem;
        }
        .button, .languageButton {
            font-size: 0.9rem;
            padding: 8px 16px;
        }
    }

    /* For mobile devices (600px and below) */
    @media (max-width: 600px) {
        .floating-title {
            font-size: 2rem;
        }
        .button, .languageButton {
            font-size: 0.8rem;
            padding: 6px 12px;
        }
        .container {
            padding: 20px;
            justify-content: space-around;
        }
        .linkContainer {
            flex-direction: column;
            gap: 10px;
        }
    }
`}
</style>



            {/* Images revolving around the center */}
            <img src="/images/health-care.png" alt="Health Care" className="medical-object health-care" />
            <img src="/images/hospital.png" alt="Hospital" className="medical-object hospital" />
            <img src="/images/immunization.png" alt="Immunization" className="medical-object immunization" />
            <img src="/images/medical-care.png" alt="Medical Care" className="medical-object medical-care" />
            <img src="/images/medical-record.png" alt="Medical Record" className="medical-object medical-record" />
            <img src="/images/pill.png" alt="Pill" className="medical-object pill" />
            <img src="/images/products.png" alt="Products" className="medical-object products" />
        </div>
    );
};

export default HomePage;
