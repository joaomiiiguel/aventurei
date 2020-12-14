const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const partners = await connection('partners').select('*');
    
        return response.json(partners);
    },

    async create (request, response) {
        const {name, nameEquip, email, whatsapp, instagram, city, uf}  = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('partners').insert({
            id, name, nameEquip, email, whatsapp, instagram, city, uf,
        })
        return response.json({ id })
    }
}