import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function Navbar() {
  const navigate = useNavigate();

  const handleAllLeads = () => {
    window.location.href = '/leads';
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <img src={logo} alt="Splash Design" className="navbar-logo" />
        <div className="navbar-brand-info">
          <span className="navbar-brand-text">Splash Design</span>
          <span className="navbar-brand-sub">Exhibitor CRM</span>
        </div>
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <button onClick={handleAllLeads} className="navbar-links-btn">All Leads</button>
        <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>+ Add Lead</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;