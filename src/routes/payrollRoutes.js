const express = require('express');
const { getPayrollReport } = require('../controllers/payrollController');
const router = express.Router();

router.get('/', getPayrollReport);

module.exports = router;
