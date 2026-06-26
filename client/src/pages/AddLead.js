import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SECTORS = [
  'Bedding & Sleep Products',
  'Building Materials & Fit-Out',
  'Decorative Stone & Luxury Surfaces',
  'Flooring & Wall Coverings',
  'Food & Beverage',
  'Furniture',
  'Gifts, Stationery & Lifestyle Products',
  'Home Decor & Accessories',
  'Home Fragrance & Wellness Products',
  'Home Textiles & Soft Furnishings',
  'Household Storage & Organization',
  'Industry Association & Trade Body',
  'Interior Design & Architecture Services',
  'Kitchenware, Cookware & Drinkware',
  'Lighting, Electrical & Technology',
  'Logistics & Supply Chain Services',
  'Luxury Textiles & Home Furnishings',
  'Security, Safety & Surveillance Technology',
  'Tableware & Glassware',
];
const STAGES = ['New Lead', 'Researched', 'Qualified', 'Contacted', 'Archived'];

function AddLead() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    'Trade Show Name': '', 'Show Year': '', 'Show Location': '', 'Show Month': '',
    'Exhibitor Company': '', 'Stand Number': '', 'Country of Origin': '', 'Sector': '',
    'Stand Size (sqm)': '', 'Stand Type': '', 'Company Website': '', 'LinkedIn Page': '',
    'Key Contact Name': '', 'Key Contact Title': '', 'Contact Email': '',
    'Priority (H/M/L)': '', 'Notes': '', 'Source': '',
    'Date Added': new Date().toISOString().split('T')[0], 'Stage': 'New Lead',
  });

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/leads', form);
    navigate('/leads');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Add New Lead</h1>
        <p>Fill in the exhibitor details below</p>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-section-label">Show Details</div>
            <div className="form-group"><label>Trade Show Name</label><input name="Trade Show Name" value={form['Trade Show Name']} onChange={set} placeholder="e.g. Heimtextil" required /></div>
            <div className="form-group"><label>Show Year</label><input name="Show Year" value={form['Show Year']} onChange={set} placeholder="e.g. 2026" /></div>
            <div className="form-group"><label>Show Location</label><input name="Show Location" value={form['Show Location']} onChange={set} placeholder="e.g. Frankfurt, Germany" /></div>
            <div className="form-group"><label>Show Month</label><input name="Show Month" value={form['Show Month']} onChange={set} placeholder="e.g. Jan" /></div>

            <hr className="form-divider" />
            <div className="form-section-label">Exhibitor Details</div>
            <div className="form-group"><label>Exhibitor Company *</label><input name="Exhibitor Company" value={form['Exhibitor Company']} onChange={set} placeholder="Company name" required /></div>
            <div className="form-group"><label>Stand Number</label><input name="Stand Number" value={form['Stand Number']} onChange={set} placeholder="e.g. Hall 3.0 / B12" /></div>
            <div className="form-group"><label>Country of Origin</label><input name="Country of Origin" value={form['Country of Origin']} onChange={set} placeholder="e.g. Germany" /></div>
            <div className="form-group"><label>Sector</label>
              <select name="Sector" value={form['Sector']} onChange={set}>
                <option value="">Select sector</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Stand Size (sqm)</label><input name="Stand Size (sqm)" value={form['Stand Size (sqm)']} onChange={set} placeholder="e.g. 72" /></div>
            <div className="form-group"><label>Stand Type</label><input name="Stand Type" value={form['Stand Type']} onChange={set} placeholder="Custom Build / Shell Scheme" /></div>

            <hr className="form-divider" />
            <div className="form-section-label">Contact & Online</div>
            <div className="form-group"><label>Company Website</label><input name="Company Website" value={form['Company Website']} onChange={set} placeholder="https://..." /></div>
            <div className="form-group"><label>LinkedIn Page</label><input name="LinkedIn Page" value={form['LinkedIn Page']} onChange={set} placeholder="https://linkedin.com/company/..." /></div>
            <div className="form-group"><label>Key Contact Name</label><input name="Key Contact Name" value={form['Key Contact Name']} onChange={set} placeholder="Full name" /></div>
            <div className="form-group"><label>Key Contact Title</label><input name="Key Contact Title" value={form['Key Contact Title']} onChange={set} placeholder="Job title" /></div>
            <div className="form-group full-width"><label>Contact Email</label><input name="Contact Email" value={form['Contact Email']} onChange={set} placeholder="email@company.com" /></div>

            <hr className="form-divider" />
            <div className="form-section-label">CRM</div>
            <div className="form-group"><label>Priority</label>
              <select name="Priority (H/M/L)" value={form['Priority (H/M/L)']} onChange={set}>
                <option value="">Select priority</option>
                <option value="H">High</option>
                <option value="M">Medium</option>
                <option value="L">Low</option>
              </select>
            </div>
            <div className="form-group"><label>Stage</label>
              <select name="Stage" value={form['Stage']} onChange={set}>
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Source</label><input name="Source" value={form['Source']} onChange={set} placeholder="e.g. Heimtextil exhibitor directory" /></div>
            <div className="form-group"><label>Date Added</label><input name="Date Added" type="date" value={form['Date Added']} onChange={set} /></div>
            <div className="form-group full-width"><label>Notes</label><textarea name="Notes" value={form['Notes']} onChange={set} placeholder="Any useful notes..." /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Lead</button>
            <Link to="/leads" className="btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLead;