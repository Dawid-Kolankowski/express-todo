export default {
  port: 1337,
  dbUri: 'mongodb://localhost:27017/todo-api',
  saltRounds: 10,
  jwtSecret: 'superSecretKey',
  jwtExpiration: '30d',
};
