'use strict';

const express = require('express');
const router = express.Router();

router.get('/web/:id', (req, res) => {
  console.log("In web.js route")  
  res.render('web');
});

module.exports = router;