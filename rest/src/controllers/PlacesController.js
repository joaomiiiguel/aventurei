const connection = require('../database/connection');


module.exports = {
    async create(request, response){
        const {namePlace, description, howtoGet, acessLevel, valueEntrance, gpsLocation, city, uf} = request.body;
        const partners_id = request.headers.authorization;

        const [id] = await connection ('places').insert({
            namePlace, description, howtoGet, acessLevel, valueEntrance, gpsLocation, city, uf, partners_id,
        });

        return response.json({ id });
    },

    async index(request, response){
        const { page = 1 } = request.query;

        const count = await connection('places').count();

        const places = await connection('places')
            .limit(10)
            .offset((page - 1) * 10)
            .select('*')

        return response.json(places);
    },

    async delete(request, response){
        const { id } = request.params;
        const partners_id = request.headers.authorization;

        const place = await connection('places')
        .where('id', id)
        .select('partners_id')
        .first();

        if (place.partners_id !== partners_id){
            return response.status(401).json({error:'Operação não permitida.'});
        }

        await connection('places').where('id', id).delete();

        return response.status(204).send();
    }
};