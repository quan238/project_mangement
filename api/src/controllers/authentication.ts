import { BadUserInputError, catchErrors } from 'errors';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  signToken,
  signTokens,
} from 'utils/authToken';
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

  const user = await User.findOne({ where: { email } });

  if (!user || !(await User.comparePasswords(password, user.password))) {
    throw new BadUserInputError({
      userNotFound: 'User is not found or invalid',
    });
  }

  const { access_token, refresh_token } = await signTokens(user);

  // 3. Add Cookies
  res.cookie('access_token', access_token, accessTokenCookieOptions);
  res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
  res.cookie('logged_in', true, {
    ...accessTokenCookieOptions,
    httpOnly: false,
  });

  res.status(200).respond({ accessToken: access_token });
});
