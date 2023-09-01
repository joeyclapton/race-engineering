import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../../../api/user/models/user.entity';
import { faker } from '@faker-js/faker/locale/pt_BR';
import * as bcrypt from 'bcryptjs';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.name = faker.name.fullName();
  user.email = faker.internet.email();
  const salt: string = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync('Senha123', salt);
  return user;
});
