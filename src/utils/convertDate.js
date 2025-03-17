const moment = require('moment');

// converts a date from d/m/yyyy or dd/mm/yyyy format to yyyy-mm-dd format.

function convertDate(dateStr) {
  return moment(dateStr, 'D/M/YYYY').format('YYYY-MM-DD');
}

module.exports = { convertDate };
