import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LeadsTable from './pages/LeadsTable';
import AddLead from './pages/AddLead';
import EditLead from './pages/EditLead';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsTable />} />
            <Route path="/add" element={<AddLead />} />
            <Route path="/edit/:id" element={<EditLead />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;