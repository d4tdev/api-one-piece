const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllerV1.3');;

router.get('/api/v1', mainController.getAllCharacters);
router.get('/api/v1/:name', mainController.getOneCharacter);
// router.get('/v1/:id/:name', mainController.getOneCharacter);
router.get('/api/v1/:name/Gallery', mainController.getGallery);
router.get('/', mainController.getHomePage)

module.exports = router;
