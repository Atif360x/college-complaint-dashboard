const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
	{
		lastName: { type: String, required: true, trim: true },
		firstName: { type: String, required: true, trim: true },
		middleName: { type: String, trim: true },
		userName: { type: String, required: true, unique: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true },
        posts: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
