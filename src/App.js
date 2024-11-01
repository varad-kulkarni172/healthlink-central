import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NormalPatient from './components/NormalPatient';
import Dashboard from './components/Dashboard';
import ForumUser from './components/ForumUser';
import ProtectedRoute from './components/ProtectedRoute';
import NurseDashboard from './components/NurseDashboard';
import LabStaffDashboard from './components/LabStaffDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/normal-patient"
                    element={
                        <ProtectedRoute>
                            <NormalPatient />
                        </ProtectedRoute>
                    }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forumuser" element={<ForumUser />} />
                <Route path="/nursedashboard" element={<NurseDashboard />} />
                <Route path="/labstaffdashboard" element={<LabStaffDashboard />} />
                <Route path="/pharmacydashboard" element={<PharmacyDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
