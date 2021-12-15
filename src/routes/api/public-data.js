// Endpoint to simulate the getting the data from server
import { parse, serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  const data = [
    { user: 'Sforza', city: 'Venezia' },
    { user: 'Visconti', city: 'Milano' },
  ];

  return {
    status: 200,
    headers: {
      'my-header_value': 'ak',
    },
    body: {
      data,
    },
  };
}
