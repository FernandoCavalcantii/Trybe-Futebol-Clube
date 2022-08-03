import Model from '../database/models/User';
import { IUsersModel } from '../protocols/interfaces';
import { TUser } from '../protocols/types';

class UsersModel implements IUsersModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async readUserByEmail(email: string): Promise<TUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}

export default UsersModel;
