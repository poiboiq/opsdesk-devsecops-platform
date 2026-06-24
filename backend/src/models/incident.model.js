const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    severity: {
      type: String,
      required: true,
      enum: ['P1', 'P2', 'P3']
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'investigating', 'resolved'],
      default: 'open'
    },
    owner: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
