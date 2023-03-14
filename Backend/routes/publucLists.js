const router = require('express').Router();
const publickLists = require('../controllers/userPublicListsController');

router.get('/getlists', publickLists.getLists);

module.exports = router;