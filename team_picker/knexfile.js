// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'Super_Team_Picker',
      user:     "jignesh",
      password: 'supersecret'
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};
