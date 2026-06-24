const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  'Trade Show Name': String,
  'Show Year': Number,
  'Show Location': String,
  'Show Month': String,
  'Exhibitor Company': String,
  'Stand Number': String,
  'Country of Origin': String,
  'Sector': String,
  'Stand Size (sqm)': String,
  'Stand Type': String,
  'Company Website': String,
  'LinkedIn Page': String,
  'Key Contact Name': String,
  'Key Contact Title': String,
  'Contact Email': String,
  'Priority (H/M/L)': String,
  'Notes': String,
  'Source': String,
  'Date Added': String,
  'Stage': { type: String, default: 'New Lead' }
}, { strict: false });

module.exports = mongoose.model('Lead', leadSchema, 'leads');