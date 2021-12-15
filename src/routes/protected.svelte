<!-- only  accessible by authenticated users. -->
<script context='module'>
// load method runs before component is rendered
// and gives access to session (and some other things)
export async function load({session}) {
  // check if the session contains the user (means the user is signed in)
  console.log('Current Session', session);
  if (!session?.user) {
    return {
      status: 302,
      redirect: '/sign-in'
    }
  }

  // By returning the user in the props object from the load function, 
  // we can access user as a prop in the component instance
  return {
    props: {
      user: session.user
    }
  };
} 
</script>

<script>
   export let user;
   // import { session } from '$app/stores';
  // $session.user;
</script>

<h1>Hi! You are registered with email: {user.email}.</h1>