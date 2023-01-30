import config from 'config';
import jwt from 'jsonwebtoken';

const jwtSign = (payload: string | object | Buffer) => {
  const jwtSecret = config.get<string>('jwtSecret');
  const jwtExpiration = config.get<string>('jwtExpiration');

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
};

export default jwtSign;
