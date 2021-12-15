<script>
// use session store to access the user data exposed by functions implemented in 'hooks.js'
import {session} from '$app/stores';
  const routes = [
    {href: '/', name: 'Home'},
    {href: '/protected', name: 'Protected'},
    {href: '/public', name: 'Public'},
  ]

  async function handleSignOut() {
    await fetch('/api/sign-out')
    window.location = '/sign-in';
  }



</script>

<nav>
  {#each routes as link}
  <a class = 'link' href = {link.href}>{link.name}</a> 
  {/each}

  {#if $session.user}
  <button on:click={handleSignOut}>Sign Out</button>
  {:else }
  <a href='/sign-in'>Sign in</a>
  <a href='/sign-up'>Sign up</a>
  {/if}
<nav>

<style>
nav {
  background-color: orange;
  display: flex;
  gap: 1rem;
}
</style>