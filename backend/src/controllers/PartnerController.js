const crypto = require('crypto');

const connection = require('../database/connection');

module.exports={
    async index(request, response) {
        const partner = await connection ('partner').select('*');
    
        return response.json(partner);

    },

    async create(request, response) {
        const {name, nameEquipe, email, whatsapp, instagram, cidade, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX')

        await connection('partner').insert({
            id, 
            name,
            nameEquipe,
            email, 
            whatsapp, 
            instagram, 
            cidade, 
            uf,
        })

        return response.json({ id });
    }
}