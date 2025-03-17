const { parseCSV } = require('../services/csvService');
const path = require('path');

const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const message = await parseCSV(req.file);
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { uploadCSV };