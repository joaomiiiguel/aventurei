exports.up = function(knex) {
    return knex.schema.createTable('partners', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('nameEquip').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('instagram').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('partners')
};
