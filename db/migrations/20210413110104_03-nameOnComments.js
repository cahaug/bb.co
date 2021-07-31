
exports.up = function(knex, Promise) {
    return knex.schema
    .table('comments1', record => {
        record.string('kirjoittanut', 255);
    })
    .table('comments2', record => {
        record.string('kirjoittanut', 255);
    })
    .table('comments3', record => {
        record.string('kirjoittanut', 255);
    });
};

exports.down = function(knex, Promise) {
  
};
