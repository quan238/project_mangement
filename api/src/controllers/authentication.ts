import { AuthenticationError, BadUserInputError, catchErrors } from 'errors';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  signToken,
  signTokens,
  verifyToken,
} from 'utils/authToken';
import createAccount from 'database/createGuestAccount';
import resetDatabase from 'database/resetDatabase';
import { User } from 'entities';
import redis from 'utils/redisConnect';

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

export const refreshAccessToken = catchErrors(async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    throw new BadUserInputError({
      refreshInValid: 'Could not refresh access token',
    });
  }

  // Validate refresh token
  const decoded = verifyToken(refresh_token);

  if (!decoded) {
    throw new AuthenticationError({
      tokenNotValid: 'Refresh token is invalid',
    });
  }

  // Check if user has a valid session
  const session = await redis.get(decoded.sub);

  if (!session) {
    throw new AuthenticationError({
      sessionNotFound: 'Your Session token is invalid',
    });
  }

  const user = await User.findOne({
    where: {
      id: JSON.parse(session).id,
    },
  });
  if (!user) {
    throw new BadUserInputError({
      userNotFound: 'User is not found or invalid',
    });
  }

  // Sign new access token
  const access_token = signToken(
    { sub: user.id },
    {
      expiresIn: '180 days',
    },
  );

  // 4. Add Cookies
  res.cookie('access_token', access_token, accessTokenCookieOptions);
  res.cookie('logged_in', true, {
    ...accessTokenCookieOptions,
    httpOnly: false,
  });

  // 5. Send response
  res.status(200).json({
    access_token,
  });
});

export const logoutController = catchErrors(async (req, res) => {
  const user = res.locals.user;

  await redis.del(user.id);
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', { maxAge: 1 });

  res.status(200).json(true);
});
