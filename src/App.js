    // client/src/App.js
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import HomePage from './pages/HomePage';
    import RegisterPage from './pages/RegisterPage';
    import LoginPage from './pages/LoginPage';
    import EmergencyPage from './pages/EmergencyPage';

    function App() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/emergency" element={<EmergencyPage />} />
                </Routes>
            </Router>
        );
    }

    export default App;