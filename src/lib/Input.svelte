<script>
  export let value = '';
  export let id;
  export let label;
  export let type = 'text';
  export let name;
  export let required = false;
  export let inputRef = null;
  function setType(node) {
    node.type = type;
  }
</script>

<div class="input-container">
  <label for="{id}" class="input-label">
    {label}
  </label>
  <div >
    <input
      use:setType
      {name}
      {id}
      {required}
      bind:value
      bind:this={inputRef}
      class="form-input"
    />
  </div>
</div>