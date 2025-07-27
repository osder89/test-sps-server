const express = require('express');
const { addUser, deleteUser, updateUser, listUsers, getUserById  } = require('../controllers/user.controller');
const router = express.Router();

router.post('/', addUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);
router.get('/', listUsers);
router.get('/:userId', getUserById);


module.exports = router;
