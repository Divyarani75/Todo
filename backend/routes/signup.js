const express = require('express');
const router = express.Router();
const User = require('../models/user');

// for formData and Content-Type:	multipart/form-data
router.post('/', (req, res, next) => {

  let {email, password} = req.body;
  if (!(email && password)) {
    return res.json({
      success: false,
      message: 'Error: mandatory field is missing.'
    });
  }

  User.find({email: email}, (err, users) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Error: Server error'
      });
    }
    else if (users.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exists'
      })
    }

    const user = new User({email});
    user.password = user.generateHash(password);

    user.save(err => {
      if (err) throw err;

      res.json({
        success: true,
        message: 'Account was saved successfully'
      });
    });
  });
});


module.exports = router;
