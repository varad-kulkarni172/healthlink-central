import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NormalPatient from './components/NormalPatient';
import Dashboard from './components/Dashboard';
import ForumUser from './components/ForumUser';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/normal-patient" element={<NormalPatient />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forumuser" element={<ForumUser/>}/>
            </Routes>
        </Router>
    );
}

export default App;
