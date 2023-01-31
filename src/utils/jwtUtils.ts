import config from 'config';
import jwt from 'jsonwebtoken';

export const jwtSign = (payload: string | object | Buffer, secretConfig: string, expirationConfig: string) => {
  const jwtSecret = config.get<string>(secretConfig);
  const jwtExpiration = config.get<string>(expirationConfig);

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
};
