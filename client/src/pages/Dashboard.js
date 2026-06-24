import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const STAGES = ['New Lead', 'Researched', 'Qualified', 'Contacted', 'Archived'];
const STAGE_COLORS = {
  'New Lead': '#3b82f6', 'Researched': '#8b5cf6',
  'Qualified': '#f59e0b', 'Contacted': '#10b981', 'Archived': '#9ca3af'
};

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leads')
      .then(res => { setLeads(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  const total = leads.length;
  const highPriority = leads.filter(l => l['Priority (H/M/L)'] === 'H').length;
  const shows = [...new Set(leads.map(l => l['Trade Show Name']))].length;
  const countries = [...new Set(leads.map(l => l['Country of Origin']))].length;

  const stageCounts = STAGES.reduce((acc, s) => {
    acc[s] = leads.filter(l => (l.Stage || 'New Lead') === s).length;
    return acc;
  }, {});

  const sectorCounts = leads.reduce((acc, l) => {
    const s = l.Sector || 'Unknown';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="page-header">
        <h1>Overview</h1>
        <p>Exhibitor intelligence database — Splash Design & Build, exceptional exhibitions</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Leads</div>
          <div className="stat-card-value">{total}</div>
          <div className="stat-card-sub">across {shows} trade shows</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">High Priority</div>
          <div className="stat-card-value highlight">{highPriority}</div>
          <div className="stat-card-sub">flagged for outreach</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Shows Covered</div>
          <div className="stat-card-value">{shows}</div>
          <div className="stat-card-sub">trade shows researched</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Countries</div>
          <div className="stat-card-value">{countries}</div>
          <div className="stat-card-sub">countries of origin</div>
        </div>
      </div>

      <div className="stage-bar">
        <div className="stage-bar-title">Pipeline — leads by stage</div>
        <div className="stage-bar-items">
          {STAGES.map(stage => (
            <div className="stage-bar-item" key={stage}>
              <span className="stage-dot" style={{ backgroundColor: STAGE_COLORS[stage] }}></span>
              <div>
                <div className="stage-count">{stageCounts[stage]}</div>
                <div className="stage-name">{stage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-meta">
          <span className="table-meta-count">Breakdown by sector</span>
          <Link to="/leads" className="btn-primary">View All Leads</Link>
        </div>
        <div className="breakdown-grid">
          {Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]).map(([sector, count]) => (
            <div className="breakdown-item" key={sector}>
              <span className="breakdown-item-name">{sector}</span>
              <span className="breakdown-item-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;