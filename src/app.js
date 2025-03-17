require('dotenv').config();
require('../config/validateEnv');  

const express = require('express');
const app = express();
const payrollRoutes = require('./routes/payrollRoutes')
const csvRoutes = require('./routes/csvRoutes')

app.use('/api/csv', csvRoutes)

app.use('/api/payroll', payrollRoutes);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Employee Payroll API');
});

module.exports = { app }