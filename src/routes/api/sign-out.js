import { removeSession } from './_db';
import { parse, serialize } from 'cookie';

// We remove the session from our in-memory database
// and remove the cookie by unsettling the value and setting an immediate expiration date

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ headers: { cookie } }) {
  const cookes = parse(cookie || '');
  if (cookies.session_id) {
    await removeSession(cookies.session_id);
  }

  return {
    status: 200,
    headers: {
      'set-cookie': serialize('session_id', '', {
        path: '/',
        expires: new Date(0),
      }),
    },
  };
}
