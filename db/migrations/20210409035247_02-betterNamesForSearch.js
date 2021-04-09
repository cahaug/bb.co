
exports.up = function(knex, Promise) {
    return knex.schema
    .table('преступники', record => {
        record.string('firstName', 100).defaultTo(null);
        record.string('middleName', 100).defaultTo(null);
        record.string('lastName',100).defaultTo(null);
    });
};

exports.down = function(knex, Promise) {

};
