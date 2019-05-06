const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {Schema} = mongoose;  // this is the equivalent of the above line (es2015 destructuring)
const keys = require('../Config/Keys');


mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);


const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0},
    firstName: String,
    lastName: String,
    email: String

});

// Loads a schema into mongoose (two arguments means we're trying to load something into mongoose
mongoose.model('users', userSchema); // we want to create a collection called users (If it doesnt already exist)
