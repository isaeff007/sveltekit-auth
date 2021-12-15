<script>
import SignUpForm from '$lib/SignUpForm.svelte';
let error;

async function handleSubmit({detail: {email, password}}) {
  const response  = await fetch('/api/sign-up', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json'
    }
    
  }
  );

  if (!response.ok) {
    error = (await response.json()).message;
    return;

  }
  window.location = '/protected';
}
</script>

<h1>Sign Up</h1>
{#if error}
  <p> {error} </p>
{/if}
<SignUpForm on:submit = {handleSubmit} > </SignUpForm>