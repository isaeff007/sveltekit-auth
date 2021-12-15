// End point called by '/api/sign-up'
import { getUserByEmail, createSession, registerUser } from './_db';
import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
// used for POST requests
// We check if a user with the given email already exists.
// If that’s not the case, we do register the new user and create a session.
export async function post({ body: { email, password } }) {
  const user = await getUserByEmail(email);
  console.log('User found:', user);
  if (user) {
    return {
      status: 409,
      body: {
        message: 'User already exists',
      },
    };
  }

  // if new user - register:
  await registerUser({ email, password });

  const { id } = await createSession(email);

  // We set the actual cookie containing the session_id.
  // That ID will be sent automatically by the client with the subsequent requests.
  return {
    status: 201,
    headers: {
      'set-cookie': serialize('session_id', id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // one week
      }),
    },

    body: {
      message: 'Sucessfully signed up',
    },
  };
}
