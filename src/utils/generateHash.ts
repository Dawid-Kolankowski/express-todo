import bcrypt from 'bcryptjs';
import config from 'config';

const generateHash = async (data: string) => {
  const salt = await bcrypt.genSalt(config.get<number>('saltRounds'));
  const hash = await bcrypt.hashSync(data, salt);

  return hash;
};

export default generateHash;
