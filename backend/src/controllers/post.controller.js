const Post = require("../model/post.model");
const Student = require('../model/student.model');

const createPost = async (req, res) => {
	try {
		const { userName } = req.body; // better: take this from your auth middleware (req.user._id)

		const student = await Student.findOne({ userName });
		if (!student) {
			return res.status(404).json({ message: 'Student not found' });
		}

		const post = await Post.create(req.body);

		await Student.findByIdAndUpdate(student._id, {
			$push: { posts: post._id },
		});

		return res.status(201).json(post);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

    console.log('received:', JSON.stringify(req.body.userName));
    console.log('db:', Student.db.name);
    console.log('students:', await Student.find().select('userName'));
};

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		return res.status(200).json(post);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updatePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		return res.status(200).json(post);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		return res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost,
};
