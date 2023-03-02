const router = require('express').Router();
const userLists = require('../controllers/userListsController');


// router.get('/user/userlists',)
router.post('/createlist', userLists.createList);
router.post('/pushtrack', userLists.pushTrack);

module.exports = router;