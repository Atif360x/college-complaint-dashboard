const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
	await mongoose.connect(config.MONGO_URI);
};

module.exports = connectDB;
