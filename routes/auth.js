const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'cheie_secreta_123'; // folosește ceva mai sigur în producție

// Înregistrare
router.post('/register', async (req, res) => {
  const { email, parola, nume } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ msg: 'Email deja folosit' });

  const parolaHash = await bcrypt.hash(parola, 10);
  const user = new User({ email, parola: parolaHash, nume });
  await user.save();
  res.status(201).json({ msg: 'Utilizator creat cu succes' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, parola } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Email incorect' });

  const parolaOk = await bcrypt.compare(parola, user.parola);
  if (!parolaOk) return res.status(400).json({ msg: 'Parolă incorectă' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, nume: user.nume } });
});

module.exports = router;
