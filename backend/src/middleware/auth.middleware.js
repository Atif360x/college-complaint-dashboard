const jwt = require('jsonwebtoken');
const Student = require('../model/student.model');

const protect = async (req, res, next) => {
	try {
		const header = req.headers.authorization;
		if (!header || !header.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Not authorized, token missing' });
		}

		const token = header.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const student = await Student.findById(decoded.id).select('-password');
		if (!student) {
			return res.status(401).json({ message: 'User no longer exists' });
		}

		req.user = student;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

module.exports = { protect };