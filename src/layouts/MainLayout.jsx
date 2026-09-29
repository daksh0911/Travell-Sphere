import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 400px)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
