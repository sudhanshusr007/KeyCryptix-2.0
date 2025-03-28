const express = require('express');
const { addPassword, getAllPasswords, deletePassword } = require('../controllers/password.controller');
const authenticate = require('../middleware/auth.middleware'); // Middleware to protect the route (authentication)
const router = express.Router();

// Route to add a password
router.post('/add', authenticate, addPassword);
router.get('/', authenticate, getAllPasswords);
router.delete('/:id', authenticate, deletePassword);

module.exports = router;
