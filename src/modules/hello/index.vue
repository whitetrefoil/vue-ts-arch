<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>
<template>
  <div class="hello">
    <h1 class="h1">Hello!!!</h1>

    <p>{{greeting}}</p>

    <p><button type="button" class="btn btn-danger" @click="changeReceptionist">Another receptionist!</button></p>

    <section>
      <h1>Inner section "another"</h1>
      <router-view name="my-global-comp"></router-view>
    </section>

    <section>
      <component-in-module name="hello"></component-in-module>
    </section>
  </div>
</template>
