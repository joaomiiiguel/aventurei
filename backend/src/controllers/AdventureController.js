const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('adventure').count();
        
        
        const adventure = await connection('adventure')
        .join('partner', 'partner.id', '=', 'adventure.partner_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'adventure.*',
            'partner.nameEquipe',
            'partner.whatsapp'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(adventure);
    },

    async create(request, response){
        const{localName,description,value,acessoLevel,comoChegar,cidade,uf,coordGPS} = request.body;
        const partner_id = request.headers.authorization;

        const [id] = await connection('adventure').insert({
            localName,
            description,
            value,
            acessoLevel,
            comoChegar,
            cidade,
            uf,
            coordGPS,
            partner_id
        })

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const partner_id = request.headers.authorization;

        const adventure = await connection('adventure')
            .where('id',id)
            .select('partner_id')
            .first();

            if(adventure.partner_id !== partner_id){
                return response.status(401).json({erro:'Autorização não permitida'})
            }
            await connection ('adventure').where('id', id).delete();
            return response.status(204).send();
    }
};