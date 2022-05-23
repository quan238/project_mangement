import { BadUserInputError, catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createAccount from 'database/createGuestAccount';
import resetDatabase from 'database/resetDatabase';
import { User } from 'entities';

export const createGuestAccount = catchErrors(async (_req, res) => {
  await resetDatabase();
  const user = await createAccount();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});

export const loginAccount = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user || !(await User.comparePasswords(password, user.password))) {
    throw new BadUserInputError({ userNotFound: 'User is not found or invalid' });
  }

  res.respond({ user });
});
