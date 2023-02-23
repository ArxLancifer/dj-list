const router = require('express').Router();
const userAuth = require('../controllers/userAuthController')
const isAuth = require('../middlawares/isAuth')

router.post("/loginuser", userAuth.loginUser);
router.post("/signup", userAuth.signUp);
router.get("/allusers", userAuth.showAllUsers);
router.get("/logintest", userAuth.test);
router.get("/onlyauth",isAuth,(req,res)=>{
    res.send("<h1>Only authenticated users</h1>");
})
module.exports = router;