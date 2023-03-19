const router = require('express').Router();
const publickLists = require('../controllers/userPublicListsController');

router.get('/getlists', publickLists.getLists);
router.post('/likelist', publickLists.likeList);
router.post('/unlikelist', publickLists.unlikeList);
module.exports = router;