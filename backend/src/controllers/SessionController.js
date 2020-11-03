const connection = require('../database/connection');

module.exports = {
    async create( request, response){
        const {id} = request.body;

        const partner = await connection('partner')
        .where('id', id)
        .select('name')
        .first();


        if (!partner){
            return response.status(400).json({error:'Partner não encontrado'})
        }
        return response.json(partner);
    }
}