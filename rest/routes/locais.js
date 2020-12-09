const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get na rota de Locais'
    })
});

router.post('/', (req, res, next) =>{
    res.status(201).send({
        mensagem:'Usando um POST na rota de Locais'
    })
});

router.get('/:id_local',(req, res, next) => {
    const id = req.params.id_local
    res.status(200).send({
        mensagem: 'Usando o Get para detalhar apenas um local',
        id: id,
    })
});

module.exports = router;