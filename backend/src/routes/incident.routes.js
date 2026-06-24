const express = require('express');

const router = express.Router();

const incidents = [
  {
    id: 'inc-001',
    title: 'API latency spike',
    severity: 'P2',
    status: 'investigating',
    owner: 'platform-team',
    createdAt: new Date().toISOString()
  }
];

router.get('/', (req, res) => {
  res.status(200).json({
    count: incidents.length,
    data: incidents
  });
});

router.post('/', (req, res) => {
  const { title, severity, owner } = req.body;

  if (!title || !severity || !owner) {
    return res.status(400).json({
      error: 'title, severity, and owner are required'
    });
  }

  const incident = {
    id: `inc-${String(incidents.length + 1).padStart(3, '0')}`,
    title,
    severity,
    status: 'open',
    owner,
    createdAt: new Date().toISOString()
  };

  incidents.push(incident);

  return res.status(201).json({
    message: 'Incident created',
    data: incident
  });
});

module.exports = router;
