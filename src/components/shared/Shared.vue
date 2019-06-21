<style lang="scss" scoped>
.my-global-comp {
  background-color: deepskyblue;
}
</style>

<template>
  <div class="shared">
    <h1 class="h1">[Component] Shared</h1>

    <p>This is a shared component. Name in URL is "{{name}}".</p>
  </div>
</template>

<script lang="ts" src="./Shared.ts"></script>
