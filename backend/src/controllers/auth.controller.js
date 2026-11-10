const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/student.model");

const createToken = (userId) =>
	jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || "7d",
	});

const register = async (req, res) => {
	try {
		const { lastName, firstName, middleName, userName, email, password } = req.body;

		if (!userName || !email || !password) {
			return res.status(400).json({ message: "User name, email, and password are required." });
		}
		if (password.length < 8) {
			return res.status(400).json({ message: "Password must be at least 8 characters long." });
		}

		const normalizedEmail = email.trim().toLowerCase();
		const existingUser = await User.findOne({ email: normalizedEmail });
		if (existingUser) {
			return res.status(409).json({ message: "An account with this email already exists." });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({
			lastName,
			firstName,
			middleName,
			userName,
			email,
			password: hashedPassword,
		});

		return res.status(201).json({
			token: createToken(user._id),
			user: { id: user._id, lastName: user.lastName, firstName: user.firstName, middleName: user.middleName, userName: user.userName, email: user.email },
            createToken
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({ message: "An account with this email already exists." });
		}
		return res.status(500).json({ message: "Unable to register account." });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required." });
		}

		const user = await User.findOne({ email: email.trim().toLowerCase() });
		const passwordMatches = user && (await bcrypt.compare(password, user.password));
		if (!passwordMatches) {
			return res.status(401).json({ message: "Invalid email or password." });
		}

		return res.status(200).json({
			token: createToken(user._id),
			user: { id: user._id, lastName: user.lastName, firstName: user.firstName, middleName: user.middleName, userName: user.userName, email: user.email },
		});
	} catch (error) {
		return res.status(500).json({ message: "Unable to log in." });
	}
};

const logout = (_req, res) =>
	res.status(200).json({ message: "Logged out successfully." });

const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ message: "Unable to retrieve account." });
	}
};

module.exports = { register, login, logout, getCurrentUser };