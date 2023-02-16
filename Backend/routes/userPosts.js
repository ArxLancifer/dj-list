const router = require('express').Router();
const userPosts = require('../controllers/userPostsController');


router.get("/posts", userPosts.getPosts);

module.exports = router;