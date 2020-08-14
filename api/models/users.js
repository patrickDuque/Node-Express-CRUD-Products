const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email    : {
    type      : String,
    trim      : true,
    lowercase : true,
    unique    : true,
    match     : [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      `Please fill valid email address`
    ],
    required  : [ true, 'Email required' ]
  },
  password : { type: String, required: [ true, 'Password required' ] },
  isAdmin  : { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
