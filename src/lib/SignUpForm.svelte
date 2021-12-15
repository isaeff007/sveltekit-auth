<script>
import {createEventDispatcher} from 'svelte';
import Input from '$lib/Input.svelte';
import Button from '$lib/Button.svelte';
  let email = '';
  let password='';
  let confirmPassword = '';
  let error;
  let confirmPasswordInputRef;

  const dispatch = createEventDispatcher();

  function submit() {
   error = null;
   if (password !== confirmPassword) {
     error = 'Passwords do not match';
     confirmPasswordInputRef.focus();
     return;
   }

    dispatch('submit', {email, password})
  }
</script>

<form on:submit|preventDefault ={submit}>
  <Input label='Email' id='email' name='email' type='email' bind:value={email} required />  
  <Input label='Password' id='password' name='password' type='password' bind:value={password} required /> 
  <Input label='Confirm Password' id='confirm-passord' name = 'confirm-password' type='password' bind:value={confirmPassword} bind:inputRef={confirmPasswordInputRef} /> 
  {#if error}
    <p class='error'>{error}</p>
  {/if}
  <Button type='submit'>Sign Up</Button>
</form>


