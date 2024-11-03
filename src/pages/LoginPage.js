import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [aadharNumber, setAadharNumber] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Normal Patient');
    const { t } = useTranslation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        '/images/slide1.png',
        '/images/slide2.png',
        '/images/slide3.png',
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => clearInterval(slideInterval);
    }, [slides.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        const data = { aadharNumber, password }; // userType is not necessary here unless your API requires it
     
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', data);
     
            if (response.status === 200) {
                const { redirectUrl, token } = response.data;
                console.log(`Redirect URL: ${redirectUrl}`);
                localStorage.setItem('token', token);
                login(); // Mark the user as authenticated
                navigate(redirectUrl);
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };
    
    
    
    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: '#e0f7fa',
            animation: 'fadeIn 1s ease-in-out',
            flexDirection: 'row', // Initial layout for larger screens
        },
        leftSection: {
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
        },
        slideShow: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transition: 'opacity 1s ease-in-out',
        },
        slideImage: {
            width: '90%',
            height: 'auto',
            objectFit: 'cover',
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '20px',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        },
        dotsWrapper: {
            position: 'absolute',
            bottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
        dot: {
            height: '10px',
            width: '10px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            margin: '0 5px',
            opacity: 0.5,
            transition: 'opacity 0.3s',
        },
        dotActive: {
            opacity: 1,
        },
        formSection: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '50px 40px',
            borderRadius: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            maxWidth: '90%',
        },
        input: {
            margin: '10px 0',
            padding: '12px 15px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
            transition: 'border-color 0.3s ease',
            outline: 'none',
        },
        select: {
            margin: '10px 0',
            padding: '12px 15px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
            transition: 'border-color 0.3s ease',
        },
        button: {
            padding: '12px 30px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
        },
        languageButtonWrapper: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'inline-block',
        },
        languageButton: {
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 0.3s ease',
        },
        dropdownMenu: {
            display: dropdownOpen ? 'block' : 'none',
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: '#fff',
            border: '1px solid #007bff',
            borderRadius: '5px',
            minWidth: '100%',
            zIndex: 1,
        },
        dropdownItem: {
            padding: '10px',
            backgroundColor: '#fff',
            color: '#007bff',
            border: 'none',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        dropdownItemHover: {
            backgroundColor: '#e0f7fa',
        },
        '@media (max-width: 1024px)': { // Tablets
            container: {
                flexDirection: 'column', // Stack sections vertically on tablets
            },
            form: {
                padding: '40px 30px',
                width: '80%', // Adjust width for smaller screens
            },
            slideImage: {
                width: '80%',
                top: '10px', // Reduce space for smaller screens
                borderRadius: '15px',
            },
            button: {
                padding: '10px 25px',
                fontSize: '0.9rem',
            },
        },
        '@media (max-width: 768px)': { // Small tablets and large phones
            container: {
                padding: '10px',
                flexDirection: 'column',
            },
            form: {
                width: '85%', // Further adjust width for smaller screens
                padding: '30px 20px',
            },
            slideImage: {
                width: '70%',
            },
            button: {
                padding: '8px 20px',
                fontSize: '0.85rem',
            },
        },
        '@media (max-width: 480px)': { // Mobile devices
            container: {
                flexDirection: 'column',
                padding: '5px',
            },
            formSection: {
                padding: '10px', // Reduce padding on small screens
            },
            form: {
                width: '95%', // Max width on mobile
                padding: '20px 15px', // Smaller padding for mobile
                borderRadius: '20px',
            },
            slideImage: {
                width: '85%',
                borderRadius: '10px',
            },
            button: {
                padding: '7px 15px',
                fontSize: '0.8rem',
            },
            dotsWrapper: {
                bottom: '10px',
            },
            dot: {
                height: '8px',
                width: '8px',
            },
            languageButton: {
                padding: '8px 15px',
                fontSize: '0.85rem',
            },
        },
    };
    

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.slideShow}>
                    <img src={slides[currentSlide]} style={styles.slideImage} alt="Slideshow" />
                </div>
                <div style={styles.dotsWrapper}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.dot,
                                ...(currentSlide === index ? styles.dotActive : {}),
                            }}
                        />
                    ))}
                </div>
            </div>
            <div style={styles.formSection}>
                <div style={styles.languageButtonWrapper}>
                    <button style={styles.languageButton} onClick={toggleDropdown}>
                        {t('Language')}
                    </button>
                    <div style={styles.dropdownMenu}>
                        <button value="en" onClick={handleLanguageChange} style={styles.dropdownItem}>
                            English
                        </button>
                        <button value="hi" onClick={handleLanguageChange} style={styles.dropdownItem}>
                            हिंदी
                        </button>
                        <button value="mar" onClick={handleLanguageChange} style={styles.dropdownItem}>
                            मराठी
                        </button>
                    </div>
                </div>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        placeholder={t('Aadhar Number')}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('Password')}
                        required
                        style={styles.input}
                    />
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="Normal Patient">{t('Normal Patient')}</option>
                        {/*<option value="Forum User">{t('Forum User')}</option>*/}
                        <option value="Hospital Doc">{t('Hospital Doc')}</option>
                        <option value="Nurse/Ward Boy">{t('Nurse/Ward Boy')}</option>
                        <option value="Lab Staff">{t('Lab Staff')}</option>
                        <option value="Pharmacy">{t('Pharmacy')}</option>
                    </select>
                    <button type="submit" style={styles.button}>
                        {t('Login')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;