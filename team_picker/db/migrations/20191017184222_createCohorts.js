
exports.up = function(knex) {
  return knex.schema.createTable("cohorts", (t) => {
    t.bigIncrements("id");
    t.string("name");
    t.string("logo_url");
    t.text("members");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cohorts");
};
