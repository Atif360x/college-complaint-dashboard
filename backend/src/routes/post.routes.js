const { protect } = require('../middleware/auth.middleware');
const { Router } = require("express");
const {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost,
} = require("../controllers/post.controller.js");

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
