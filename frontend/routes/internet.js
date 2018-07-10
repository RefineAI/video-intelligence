'use strict';

const express = require('express');
const router = express.Router();

router.get('/internet/:id', (req, res) => {
  console.log("In web.js route")  
  res.render('internet');
});

module.exports = router;