import * as bcryptjs from 'bcryptjs';

const decryptPass = (password: string, dbPassword: string) => {
  const isMatch = bcryptjs.compareSync(password, dbPassword);
  return isMatch;
};

export default decryptPass;
