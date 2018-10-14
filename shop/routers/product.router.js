const express = require('express');
const router = express.Router();
const checkIfAuth = require('../../middleware/checkIfAdmin');
router.post('/first', checkIfAuth, (req, res, next) => {
    return res.status(200).json({
        message: 'Hello world'
    });
});

module.exports = router;