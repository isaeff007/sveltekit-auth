<script context='module'>
// load method runs before component is rendered
export async function load({fetch}) {
  // check if the session contains the user (means the user is signed in)  
  const res = await fetch('/api/public-data');
  const condotieri = await res.json();
  
  

  // By returning the user in the props object from the load function, 
  // we can access user as a prop in the component instance
  return {
    props: {
      condotieri
    }  
  }  
} 
</script>

<script>
   export let condotieri;
</script>

<h2> Public is here </h2>
{#each condotieri.data as c}
{c.user} | {c.city}
{/each}
