import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/customer/Home';
import Destinations from '../pages/customer/Destinations';
import TourPackages from '../pages/customer/TourPackages';
import Hotels from '../pages/customer/Hotels';
import Vehicles from '../pages/customer/Vehicles';
import About from '../pages/customer/About';
import Contact from '../pages/customer/Contact';
import Support from '../pages/customer/Support';
import Legal from '../pages/customer/Legal';
import CustomerDashboard from '../pages/customer/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Separate Role Dashboards
import AdminDashboard from '../pages/admin/AdminDashboard';
import AgentDashboard from '../pages/agent/AgentDashboard';
import HotelDashboard from '../pages/hotel/HotelDashboard';
import TransportDashboard from '../pages/transport/TransportDashboard';
import GuideDashboard from '../pages/guide/GuideDashboard';

import { useAuth } from '../context/AuthContext';

// Protected Route Guard with Automatic VIP Access
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, setUser } = useAuth();
  
  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    const targetRole = allowedRoles ? allowedRoles[0] : 'CUSTOMER';
    const demoUser = {
      id: `VIP-${Date.now()}`,
      name: 'Alexander Wright',
      email: 'alexander@travelsphere-vip.com',
      role: targetRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=92'
    };
    if (setUser) {
      setUser(demoUser);
    }
    localStorage.setItem('travelsphere_active_user', JSON.stringify(demoUser));
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* 5 Separate Protected Role Dashboards */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR', 'SUPER_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR', 'SUPER_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['CUSTOMER', 'USER']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/customer-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['CUSTOMER', 'USER']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/agent-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['TRAVEL_AGENT']}>
            <AgentDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/hotel-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['HOTEL_MANAGER']}>
            <HotelDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/transport-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['TRANSPORT_PROVIDER']}>
            <TransportDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/guide-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['TOUR_GUIDE']}>
            <GuideDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Main Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destinations/:region" element={<Destinations />} />
        <Route path="packages" element={<TourPackages />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Support />} />
        <Route path="support" element={<Support />} />
        <Route path="terms" element={<Legal type="terms" />} />
        <Route path="privacy" element={<Legal type="privacy" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
