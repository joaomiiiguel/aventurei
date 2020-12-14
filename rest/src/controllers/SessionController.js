const connection = require('../database/connection');

module.exports={
    async create(request, response){
        const { id } = request.body;

        const partners = await connection('partners')
        .where('id', id)
        .select('name')
        .first();

        if(!partners){
            return response.status(400).json({error:'ID não encontrado'})
        }
        return response.json(partners);
    }
}