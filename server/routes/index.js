const express = require('express');
const watering = require('./watering_mode');

const router = express.Router();

router.get('/test', (req, res) => { // initial testing
  res.send('OK');
});

module.exports = router;