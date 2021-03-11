const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://zvpyymiobgavlv:a557370a1f2b00e425951cfb7f9808381511872aa0dcc5a44a9587a5957dedc7@ec2-54-164-241-193.compute-1.amazonaws.com:5432/d3d8t2dvi6km5s',
    dialect: 'postgres',
    seederStorage: 'sequelize'
  }
};
