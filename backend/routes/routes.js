const express = require('express');
const router = express.Router();
const objectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.js');

//Get Api
router.get('/', (req, res) => {
  Employee.find((err, doc) => {
    if (err) {
      console.log('Error in get data ' + err);
    } else {
      res.send(doc);
    }
  });
});

// Get employee by id
router.get('/:id', (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log('Error in get employee by id' + err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.status(400).send('No data found for ' + req.params.id)
  }
});

//Post api
router.post('/', (req, res) => {
  let emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    dept: req.body.dept
  });

  emp.save((err, doc) => {
    if (err) {
      console.log('Error in post data ' + err);
    } else {
      res.send(doc);
    }
  });
});

//Put Api
router.put('/:id', (req, res) => {
  let emp = {
    name: req.body.name,
    position: req.body.position,
    dept: req.body.dept
  };
  if (objectId.isValid(req.params.id)) {
    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
      if (err) {
        console.log('Error in Update employee' + err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.status(400).send('No data found for ' + req.params.id)
  }
});

//Delete Api
router.delete('/:id', (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log('Error in delete' + err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.status(400).send('No data found for ' + req.params.id)
  }
});

module.exports = router;
