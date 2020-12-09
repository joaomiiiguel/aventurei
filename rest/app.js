const express = require('express')
const app = express();

const rotaLocais = require('./routes/locais')

app.use('/locais', rotaLocais);


module.exports = app;