
exports.up = function(knex, Promise) {
    return knex.schema
    .table('суждения1', record => {
        record.string('kirjoittanut', 255);
    })
    .table('суждения2', record => {
        record.string('kirjoittanut', 255);
    })
    .table('суждения3', record => {
        record.string('kirjoittanut', 255);
    });
};

exports.down = function(knex, Promise) {
  
};
