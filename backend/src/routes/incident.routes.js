const express = require('express');
const Incident = require('../models/incident.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, severity, owner } = req.body;

    if (!title || !severity || !owner) {
      return res.status(400).json({
        error: 'title, severity, and owner are required'
      });
    }

    const incident = await Incident.create({
      title,
      severity,
      owner
    });

    return res.status(201).json({
      message: 'Incident created',
      data: incident
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: 'status is required'
      });
    }

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!incident) {
      return res.status(404).json({
        error: 'Incident not found'
      });
    }

    return res.status(200).json({
      message: 'Incident status updated',
      data: incident
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
