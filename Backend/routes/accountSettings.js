const router = require('express').Router();
const accountSettings = require('../controllers/accountSettings')

router.post('/uploadavatar', accountSettings.uploadAvatar);

module.exports = router;