import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

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
const STAGES = ['New Lead', 'Researched', 'Qualified', 'Contacted', 'Archived'];

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/leads/${id}`)
      .then(res => setForm(res.data));
  }, [id]);

  if (!form) return <div className="loading">Loading...</div>;

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/leads/${id}`, form);
    navigate('/leads');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Edit Lead</h1>
        <p>{form['Exhibitor Company']}</p>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-section-label">Show Details</div>
            <div className="form-group"><label>Trade Show Name</label><input name="Trade Show Name" value={form['Trade Show Name'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Show Year</label><input name="Show Year" value={form['Show Year'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Show Location</label><input name="Show Location" value={form['Show Location'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Show Month</label><input name="Show Month" value={form['Show Month'] || ''} onChange={set} /></div>

            <hr className="form-divider" />
            <div className="form-section-label">Exhibitor Details</div>
            <div className="form-group"><label>Exhibitor Company</label><input name="Exhibitor Company" value={form['Exhibitor Company'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Stand Number</label><input name="Stand Number" value={form['Stand Number'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Country of Origin</label><input name="Country of Origin" value={form['Country of Origin'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Sector</label>
              <select name="Sector" value={form['Sector'] || ''} onChange={set}>
                <option value="">Select sector</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Stand Size (sqm)</label><input name="Stand Size (sqm)" value={form['Stand Size (sqm)'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Stand Type</label><input name="Stand Type" value={form['Stand Type'] || ''} onChange={set} /></div>

            <hr className="form-divider" />
            <div className="form-section-label">Contact & Online</div>
            <div className="form-group"><label>Company Website</label><input name="Company Website" value={form['Company Website'] || ''} onChange={set} /></div>
            <div className="form-group"><label>LinkedIn Page</label><input name="LinkedIn Page" value={form['LinkedIn Page'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Key Contact Name</label><input name="Key Contact Name" value={form['Key Contact Name'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Key Contact Title</label><input name="Key Contact Title" value={form['Key Contact Title'] || ''} onChange={set} /></div>
            <div className="form-group full-width"><label>Contact Email</label><input name="Contact Email" value={form['Contact Email'] || ''} onChange={set} /></div>

            <hr className="form-divider" />
            <div className="form-section-label">CRM</div>
            <div className="form-group"><label>Priority</label>
              <select name="Priority (H/M/L)" value={form['Priority (H/M/L)'] || ''} onChange={set}>
                <option value="">Select priority</option>
                <option value="H">High</option>
                <option value="M">Medium</option>
                <option value="L">Low</option>
              </select>
            </div>
            <div className="form-group"><label>Stage</label>
              <select name="Stage" value={form['Stage'] || 'New Lead'} onChange={set}>
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Source</label><input name="Source" value={form['Source'] || ''} onChange={set} /></div>
            <div className="form-group"><label>Date Added</label><input name="Date Added" type="date" value={form['Date Added'] || ''} onChange={set} /></div>
            <div className="form-group full-width"><label>Notes</label><textarea name="Notes" value={form['Notes'] || ''} onChange={set} /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Changes</button>
            <Link to="/leads" className="btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLead;