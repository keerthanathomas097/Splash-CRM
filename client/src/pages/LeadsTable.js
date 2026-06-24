import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const STAGES = ['New Lead', 'Researched', 'Qualified', 'Contacted', 'Archived'];
const SECTORS = [
  'Bedding & Sleep Products',
  'Building Materials & Fit-Out',
  'Decorative Stone & Luxury Surfaces',
  'Flooring & Wall Coverings',
  'Food & Beverage',
  'Furniture',
  'Gifts & Lifestyle Products',
  'Home Decor & Accessories',
  'Home Textiles & Soft Furnishings',
  'Industry Association & Trade Body',
  'Interior Design & Architecture Services',
  'Lighting, Electrical & Technology',
  'Logistics & Supply Chain Services',
  'Luxury Textiles & Home Furnishings',
  'Security, Safety & Surveillance Technology',
];

function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterShow, setFilterShow] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStage, setFilterStage] = useState('');

  const fetchLeads = useCallback(() => {
    const params = {};
    if (search) params.search = search;
    if (filterShow) params.show = filterShow;
    if (filterSector) params.sector = filterSector;
    if (filterCountry) params.country = filterCountry;
    if (filterPriority) params.priority = filterPriority;
    if (filterStage) params.stage = filterStage;
    axios.get('http://localhost:5000/api/leads', { params })
      .then(res => { setLeads(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, filterShow, filterSector, filterCountry, filterPriority, filterStage]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(fetchLeads, 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  const handleStageChange = async (id, stage) => {
    await axios.patch(`http://localhost:5000/api/leads/${id}/stage`, { stage });
    fetchLeads();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await axios.delete(`http://localhost:5000/api/leads/${id}`);
    fetchLeads();
  };

  const reset = () => {
    setSearch(''); setFilterShow(''); setFilterSector('');
    setFilterCountry(''); setFilterPriority(''); setFilterStage('');
  };

  const shows = [...new Set(leads.map(l => l['Trade Show Name']).filter(Boolean))].sort();
  const countries = [...new Set(leads.map(l => l['Country of Origin']).filter(Boolean))].sort();
   
  const exportToCSV = () => {
  if (leads.length === 0) return;

  const headers = [
    'Exhibitor Company', 'Trade Show Name', 'Show Year', 'Show Month',
    'Show Location', 'Stand Number', 'Country of Origin', 'Sector',
    'Stand Size (sqm)', 'Stand Type', 'Company Website', 'LinkedIn Page',
    'Key Contact Name', 'Key Contact Title', 'Contact Email',
    'Priority (H/M/L)', 'Stage', 'Notes', 'Source', 'Date Added'
  ];

  const rows = leads.map(lead =>
    headers.map(h => `"${(lead[h] || '').toString().replace(/"/g, '""')}"`)
  );

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `splash-crm-leads-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
  return (
    <div>
      <div className="page-header-row">
        <div className="page-header">
          <h1>All Leads</h1>
          <p>Search, filter and manage your exhibitor pipeline</p>
        </div>
        <Link to="/add" className="btn-primary">+ Add Lead</Link>
      </div>

      <div className="filters-bar">
        <input className="filter-input" placeholder="Search company..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="filter-select" value={filterShow} onChange={e => setFilterShow(e.target.value)}>
          <option value="">All Shows</option>
          {shows.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filterSector} onChange={e => setFilterSector(e.target.value)}>
          <option value="">All Sectors</option>
          {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="H">High</option>
          <option value="M">Medium</option>
          <option value="L">Low</option>
        </select>
        <select className="filter-select" value={filterStage} onChange={e => setFilterStage(e.target.value)}>
          <option value="">All Stages</option>
          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn-reset" onClick={reset}>Reset</button>
      </div>

      <div className="table-wrapper">
        <div className="table-meta">
          <span className="table-meta-count">Showing <span>{leads.length}</span> leads</span>
          <button className="btn-export" onClick={exportToCSV}>Export CSV</button>
        </div>
        {loading ? <div className="loading">Loading...</div> : leads.length === 0 ? (
          <div className="empty-state"><strong>No leads found</strong><p>Try adjusting your filters.</p></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="leads-table">
              <thead>
                <tr>
                   <th>Company</th><th>Trade Show</th><th>Sector</th>
                    <th>Country</th><th>Priority</th><th>Stage</th>
                    <th>Contact</th><th>Website</th><th>LinkedIn</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead._id}>
                    <td>
                      <div className="company-name">{lead['Exhibitor Company']}</div>
                      <div className="cell-sub">{lead['Stand Number']}</div>
                    </td>
                    <td>
                      <div>{lead['Trade Show Name']}</div>
                      <div className="cell-sub">{lead['Show Month']} {lead['Show Year']}</div>
                    </td>
                    <td>{lead['Sector']}</td>
                    <td>{lead['Country of Origin']}</td>
                    <td>
                      <span className={`badge badge-${lead['Priority (H/M/L)'] || 'none'}`}>
                        {lead['Priority (H/M/L)'] || '—'}
                      </span>
                    </td>
                    <td>
                      <select className="stage-select" value={lead.Stage || 'New Lead'} onChange={e => handleStageChange(lead._id, e.target.value)}>
                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                   <td>
  <div>{lead['Key Contact Name']}</div>
  <div className="cell-sub">{lead['Contact Email']}</div>
</td>
<td>
  {lead['Company Website'] ? (
    <a href={lead['Company Website']} target="_blank" rel="noreferrer" className="table-link">Website</a>
  ) : <span className="cell-sub">—</span>}
</td>
<td>
  {lead['LinkedIn Page'] ? (
    <a href={lead['LinkedIn Page']} target="_blank" rel="noreferrer" className="table-link">LinkedIn</a>
  ) : <span className="cell-sub">—</span>}
</td>
<td>
  <div className="action-btns">
    <Link to={`/edit/${lead._id}`} className="btn-edit">Edit</Link>
    <button className="btn-delete" onClick={() => handleDelete(lead._id)}>Delete</button>
  </div>
</td>
                    

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadsTable;