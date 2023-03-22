const router = require('express').Router();
const publickLists = require('../controllers/userPublicListsController');

router.get('/getlists', publickLists.getLists);
router.post('/likelist', publickLists.likeList);
router.post('/unlikelist', publickLists.unlikeList);
router.get('/discussion/:listid', publickLists.listComments);
router.post('/discussion/:listid', publickLists.addComment);
module.exports = router;