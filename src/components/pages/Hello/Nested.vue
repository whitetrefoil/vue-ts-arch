<style lang="scss" scoped>
.nested {
  background-color: hotpink;
}
</style>

<template>
  <div class="nested">
    <h1 class="h1">[component] Nested</h1>

    <p>This is a component in "{{name}}" module.</p>

    <p>{{testData}}</p>
  </div>
</template>

<script lang="ts" src="./Nested.ts"></script>
