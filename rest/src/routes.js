const express = require('express');

const PartnersController = require('./controllers/PartnersController');
const PlacesController = require('./controllers/PlacesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const router = express.Router();

router.post('/sessions', SessionController.create)
//Parceiros
router.get('/partners', PartnersController.index);
router.post('/partners', PartnersController.create);

//Perfils
router.get('/profile', ProfileController.index);

//Lugares
router.post('/places', PlacesController.create);
router.get('/places', PlacesController.index);
router.delete('/places/:id', PlacesController.delete);

module.exports = router;