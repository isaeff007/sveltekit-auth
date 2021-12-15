// Hooks run on the server and allow us to extend the behavior of SvelteKit.
import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './routes/api/_db';

// Handle(): to extend request with custom data
// getSession(): to make the custom data avail. for client (frontend)
// This way, the user object containing the users’ email will be accessible in the frontend

// This function runs every time SvelteKit receives a request
// This allows us to modify response headers or bodies
/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ request, resolve }) {
  const cookies = parse(request.headers.cookie || '');
  console.log('Cookies:', cookies);
  if (cookies.session_id) {
    // To add custom data to the request, which is passed to endpoints, populate the request.locals
    const session = await getSessionFromApi(cookies.session_id);
    console.log('Session from api', session);
    if (session) {
      request.locals.user = { email: session.email };
      return resolve(request);
    }
  }
  // reset if not a session id in cookie
  request.locals.user = null;
  return resolve(request);
}
// Whatever we return from getSession will be available in a session Svelte store in the frontend.
// Make sure to not return sensitive data (like the password) here.
/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
  return request?.locals?.user
    ? { user: { email: request.locals.user.email } }
    : {};
}
