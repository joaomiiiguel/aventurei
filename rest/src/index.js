const { response } = require('express');
const express = require('express');
const rotas = require('./routes.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);


app.listen(3333);