const connection = require('../database/connection');

module.exports = {
    async index( request, response) {
        const partners_id = request.headers.authorization;

        const places = await connection('places')
        .where('partners_id', partners_id)
        .select('*');

        return response.json(places);
    }
}