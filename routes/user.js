const express = require('express');
const {handleUsersignUp,handleUserLogin} = require('../controllers/user')

const router = express.Router();

router.post('/',handleUsersignUp);
router.post('/login',handleUserLogin)


module.exports = router;