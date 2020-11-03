const express = require('express');

const PartnerController = require('./controllers/PartnerController');
const AdventureController = require('./controllers/AdventureController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create )

routes.get('/partner', PartnerController.index);

routes.post('/partner', PartnerController.create);


routes.get('/profile', ProfileController.index);

routes.get('/adventure', AdventureController.index);
routes.post('/adventure', AdventureController.create);
routes.delete('/adventure/:id', AdventureController.delete);

module.exports = routes;