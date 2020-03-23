const express = require('express');
const router = express.Router();

const config = require('config');

router.get('/', (req, res) => {
  res.json({ title: config.get('name') });
});

router.get('/ping', (req, res) => {
  res.json({ pong: true });
});

module.exports = router;
