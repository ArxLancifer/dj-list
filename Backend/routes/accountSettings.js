const router = require('express').Router();
const accountSettings = require('../controllers/accountSettings')
const upload = require("../middlawares/multer");

router.post('/uploadavatar',upload.single('userAvatar'), accountSettings.uploadAvatar);

module.exports = router;