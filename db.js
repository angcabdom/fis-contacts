const mongoose = require('mongoose');
const DB_URL = (process.env.MONGO_URL || 'mongodb://localhost:27017/dev');
const DB_URL_TESTS = (process.env.MONGO_URL || 'mongodb://localhost:27017/test');

const dbConnect = function(testing) {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    if(testing) {
        console.log("Using test url");
        return mongoose.connect(DB_URL_TESTS, { useNewUrlParser: true });
    } else {
        console.log("Using dev url");
        return mongoose.connect(DB_URL, { useNewUrlParser: true });
    }
    
};

module.exports = dbConnect;