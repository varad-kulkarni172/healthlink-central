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
        },
        title: {
            fontSize: '3rem',
            color: '#333',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 2,
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
            zIndex: 2,
        },
        languageButton: {
            position: 'absolute',
            top: '20px',
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
    .floating-title {
        position: absolute;
        animation: float 3s infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .medical-object {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 20%;
        left: 50%;
        transform-origin: 0 200px; /* Center point */
        animation: circular-revolve 10s infinite linear, self-rotate 5s infinite linear;
    }

    @keyframes circular-revolve {
        0% {
            transform: rotate(0deg) translateX(200px); /* Distance from center */
        }
        100% {
            transform: rotate(360deg) translateX(200px); /* Distance from center */
        }
    }

    @keyframes self-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .health-care { animation-delay: 0s; transform-origin: 0 180px; } /* Adjust distance */
    .hospital { animation-delay: 1s; transform-origin: 0 190px; } /* Adjust distance */
    .immunization { animation-delay: 2s; transform-origin: 0 200px; } /* Adjust distance */
    .medical-care { animation-delay: 3s; transform-origin: 0 210px; } /* Adjust distance */
    .medical-record { animation-delay: 4s; transform-origin: 0 220px; } /* Adjust distance */
    .pill { animation-delay: 5s; transform-origin: 0 230px; } /* Adjust distance */
    .products { animation-delay: 6s; transform-origin: 0 240px; } /* Adjust distance */
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
