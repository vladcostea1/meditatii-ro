const express = require('express');
const router = express.Router();
const Meditatie = require('../models/Meditatie');

// GET - toate meditațiile
router.get('/', async (req, res) => {
  try {
    const meditatii = await Meditatie.find();
    res.json(meditatii);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - adaugă o nouă meditație
router.post('/', async (req, res) => {
  try {
    const newMeditatie = new Meditatie(req.body);
    await newMeditatie.save();
    res.status(201).json(newMeditatie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
