    // client/src/pages/EmergencyPage.js
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const EmergencyPage = () => {
        const [message, setMessage] = useState('');

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('/api/users/emergency', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setMessage(response.data.message);
                } catch (error) {
                    setMessage('Access denied');
                }
            };

            fetchData();
        }, []);

        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f0f8ff',
                fontFamily: 'Arial, sans-serif',
            },
            message: {
                fontSize: '1.5rem',
                color: '#333',
            }
        };

        return (
            <div style={styles.container}>
                <p style={styles.message}>{message}</p>
            </div>
        );
    };

    export default EmergencyPage;