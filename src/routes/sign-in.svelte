<script>
import SignInForm from '$lib/SignInForm.svelte';
let error;

async function handleSubmit({detail: {email, password}}) {  
  const response  = await fetch('/api/sign-in', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json'
    }    
  });

  console.log('Response for sign-in', response);

  if (!response.ok) {    
    error = (await response.json()).message;
    return;
  } else {
    console.log('Redirect to protected section');
    window.location = '/protected';
  }
  
}
</script>

<h1>Sign In</h1>
{#if error}
  <p> {error} </p>
{/if}
<SignInForm on:submit = {handleSubmit}> </SignInForm>