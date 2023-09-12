const mongoose = require('mongoose');
const mongodb = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0';
mongoose.connect(mongodb, {useNewUrlParser: true});
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to ${'dbURI'}', mongodb);
});

require('./locations');