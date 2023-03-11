const router = require('express').Router();
const userLists = require('../controllers/userListsController');


// router.get('/user/userlists',)
router.get('/getlists/:user', userLists.getLists);
router.get('/gettracks/:listid', userLists.getTracks);
router.post('/createlist', userLists.createList);
router.post('/pushtrack/:listid', userLists.pushTrack);
router.put('/updatetrack/:listid/:trackid', userLists.editTrack);
router.delete('/deletetrack/:listid/:trackid', userLists.deleteTrack);
module.exports = router;