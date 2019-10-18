// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'Super_Team_Picker',
      user:     'jigs',
      password: 'supersecret'
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};
