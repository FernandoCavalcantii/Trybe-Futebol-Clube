import { TUser } from '../protocols/types';

const noPassUserObj = (
  id: number,
  username: string,
  role: string,
  email: string,
): Omit<TUser, 'password'> => ({
  id,
  username,
  role,
  email,
});

export default noPassUserObj;
