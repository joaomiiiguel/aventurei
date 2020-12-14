exports.up = function(knex) {
    return knex.schema.createTable('places', function(table){
        table.increments();
        table.string('namePlace').notNullable();
        table.string('description').notNullable();
        table.string('howtoGet').notNullable();
        table.string('acessLevel').notNullable();
        table.decimal('valueEntrance').notNullable();
        table.string('gpsLocation').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

        table.string('partners_id').notNullable();

        table.foreign('partners_id').references('id').inTable('partners');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('places');
};
