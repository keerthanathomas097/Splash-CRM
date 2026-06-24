const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// GET all leads with optional filters
router.get('/', async (req, res) => {
  try {
    const { show, sector, country, priority, stage, search } = req.query;
    let query = {};

    if (show) query['Trade Show Name'] = show;
    if (sector) query['Sector'] = sector;
    if (country) query['Country of Origin'] = country;
    if (priority) query['Priority (H/M/L)'] = priority;
    if (stage) query['Stage'] = stage;
    if (search) {
      query['Exhibitor Company'] = { $regex: search, $options: 'i' };
    }

    const leads = await Lead.find(query).sort({ 'Exhibitor Company': 1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single lead
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new lead
router.post('/', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update lead
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update stage only
router.patch('/:id/stage', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { Stage: req.body.stage },
      { new: true }
    );
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE lead
router.delete('/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;