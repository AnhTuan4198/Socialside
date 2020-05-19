const mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=Promise;

mongoose.connect("mongodb://localhost/Chap-app", {
  //keepAlive = true,
  //useMongoClient = true
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports.User = require('./User');