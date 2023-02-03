export default {
  port: 1337,
  dbUri: 'mongodb://localhost:27017/todo-api',
  saltRounds: 10,
  jwtSecret: 'superSecretKey',
  jwtRefreshSecret: 'superSecretRefreshKey',
  jwtExpiration: '1', //days
  jwtRefreshExpiration: '30', //days
};
