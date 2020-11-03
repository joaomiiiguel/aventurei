const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const partner_id = request.headers.authorization;

        const adventure = await connection('adventure')
        .where('partner_id', partner_id)
        .select('*');

        return response.json(adventure);
    }
}