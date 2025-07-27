const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { login } = require('../controllers/auth.controller');

router.post('/login', (req, res, next) => {
    console.log('Solicitud POST en /api/auth/login recibida');
    next();  
}, login);


module.exports = router;
