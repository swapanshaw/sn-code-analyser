const express = require('express');
const router = express.Router();

router.get('/name', function (req, res, next) {
  res.json({
    name: 'Bob'
  })
});

module.exports = router;