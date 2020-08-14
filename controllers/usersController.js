// Libraries
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Schema
const User = require('../api/models/users');

exports.signup = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({ error: { message: 'Email already exist' } });
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: { message: 'Error creating new User', error: err.message } });
    } else {
      try {
        const newUser = new User({
          email    : email,
          password : hash,
          isAdmin  : isAdmin ? isAdmin : false
        });
        const user = await newUser.save();
        res.status(201).json({ message: 'Successfully created new User', user });
      } catch (error) {
        res.status(500).json({ error: { message: 'Error creating new User', error: error.message } });
      }
    }
  });
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: { message: 'Invalid credentials' } });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ error: { message: 'Error loggin in... Please try again', error: err.message } });
      } else if (result) {
        res.status(200).json({ user: { email: user.email, _id: user._id, isAdmin: user.isAdmin } });
      } else {
        res.status(400).json({ error: { message: 'Invalid credentials' } });
      }
    });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error loggin in... Please try again', error: error.message } });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({ message: 'Deleted User' });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error deleting user', error: error.message } });
  }
};
