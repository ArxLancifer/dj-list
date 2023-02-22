const router = require('express').Router();
const userAuth = require('../controllers/userAuthController')


router.post("/loginuser", userAuth.loginUser);
router.post("/signup", userAuth.signUp);
router.get("/allusers", userAuth.showAllUsers);
router.get("/logintest", userAuth.test);
module.exports = router;