const mongoose = require('mongoose');

mongoose.set('debug', true);
// allows us to use promises with mongoose - async javascript easier
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017')
