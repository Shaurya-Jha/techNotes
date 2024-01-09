const express = require('express');
const router = express.Router();
const path = require('path');

// get request
// ^/$ means it will only match if req route is /
router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router