exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(users) {
      users.increments();
      users.string('username');
      users.string('hashed_pw')
    }),
    knex.schema.createTable('posts', function(table) {
      table.increments();
      table.integer('user_id').references('users.id');
      table.string('title');
      table.string('body');
      table.string('img');
      table.integer('voteCount')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('users')
  ])
};
