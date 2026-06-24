const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'opsdesk-backend',
    timestamp: new Date().toISOString()
  });
});

router.get('/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    service: 'opsdesk-backend',
    timestamp: new Date().toISOString()
  });
});

router.get('/ready', (req, res) => {
  const mongoReady = mongoose.connection.readyState === 1;

  if (!mongoReady) {
    return res.status(503).json({
      status: 'not_ready',
      service: 'opsdesk-backend',
      database: 'disconnected',
      timestamp: new Date().toISOString()
    });
  }

  return res.status(200).json({
    status: 'ready',
    service: 'opsdesk-backend',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
