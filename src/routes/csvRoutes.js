const express = require('express');
const { uploadCSV } = require('../controllers/csvController');
const router = express.Router();

const { upload } = require("../utils/multerUtils")

router.post('/', upload.single('csv'), uploadCSV);

module.exports = router;
