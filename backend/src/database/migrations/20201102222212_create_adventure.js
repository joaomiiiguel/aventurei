exports.up = function (knex) {
    return knex.schema.createTable('adventure', function (table) {
        table.increments()
        table.string('localName').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('acessoLevel').notNullable();
        table.string('comoChegar').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('coordGPS').notNullable();

        table.string('partner_id').notNullable();

        table.foreign('partner_id').references('id').inTable('partner');
    })
};

exports.down = function (knex) {
    return knex.schema.createTable('adventure');    

};
