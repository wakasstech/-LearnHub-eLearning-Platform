const express = require('express');
const router = express.Router();
const roleController = require('../Controllers/roleController');
router.post('/create-role', roleController.createRole);
router.put('/roles/:name', roleController.updateRole);
router.delete('/roles/:name', roleController.deleteRole);
router.get('/roles', roleController.getRoles);
module.exports = router;
