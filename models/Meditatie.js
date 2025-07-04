const mongoose = require('mongoose');

const MeditatieSchema = new mongoose.Schema({
  numeStudent: { type: String, required: true },
  materie: { type: String, required: true },
  clasa: { type: String, required: true },
  pret: { type: Number, required: true },
  locatie: { type: String, required: true },
  descriere: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meditatie', MeditatieSchema);
