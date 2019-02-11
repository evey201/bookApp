var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/BookApp', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://root:secret1234@cluster0-hfvbb.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

module.exports = {mongoose}; 
