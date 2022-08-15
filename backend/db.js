const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employeeDB', (err) => {
  if (!err) {
    console.log('DB Connection successfull.')
  } else {
    console.log('Error in DB Connection.')
  }
});

module.exports = mongoose;
