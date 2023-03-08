const router = require('express').Router();
const userLists = require('../controllers/userListsController');


// router.get('/user/userlists',)
router.get('/getlists/:user', userLists.getLists);
router.get('/gettracks/:listid', userLists.getTracks);
router.post('/createlist', userLists.createList);
router.post('/pushtrack/:listid', userLists.pushTrack);

module.exports = router;