// End point called by '/api/sign-in'
import { getUserByEmail, createSession } from './_db';
import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
// used for POST requests
// We check if a user with the given email is registered.
// If that’s not the case, we do sign in the user and create a session.
export async function post({ body: { email, password } }) {
  const user = await getUserByEmail(email);
  console.log('User found for email', user);
  if (!user || user.password !== password) {
    return {
      status: 401,
      body: {
        message: 'Incorrect user or password',
      },
    };
  }

  const { id } = await createSession(email);
  console.log('Session created', id);
  // We set the actual cookie containing the session_id.
  // That ID will be sent automatically by the client with the subsequent requests.
  const header_value = {
    'set-cookie': serialize('session_id', id, {
      path: '/',
      httpOnly: 'true',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // one week
    }),
  };

  console.log('HEADER FOR 200', header_value);

  return {
    status: 200,
    headers: header_value,
    body: {
      message: 'Successfully signed in',
    },
  };
}
