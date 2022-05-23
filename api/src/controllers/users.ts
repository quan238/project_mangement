import { User } from 'entities';
import { catchErrors } from 'errors';
import { createEntity, findEntityOrThrow } from 'utils/typeorm';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});

export const getUsers = catchErrors(async (req, res) => {
  const users = await User.createQueryBuilder('user')
    .select()
    .getMany();

  res.respond({ users });
});

export const getUserByEmail = catchErrors(async (req, res) => {
  const { email }: { email: string; password: string } = req.body;
  const user = await User.findOne({ where: { email: email } });

  res.respond({ user });
});

export const createUser = catchErrors(async (req, res) => {
  const user = await createEntity(User, { ...req.body });
  res.respond({ user });
});
