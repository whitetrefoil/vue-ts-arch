<style lang="sass" src="./index.sass"></style>

<template>
  <div class="hello">
    <h1 class="h1">[Module] HelloComponent</h1>

    <h3 class="h3">Hello!!!</h3>

    <p>{{greeting}}</p>

    <p><button type="button" class="btn btn-danger" @click="changeReceptionist">Another receptionist!</button></p>

    <section>
      <router-view name="my-global-comp"></router-view>
    </section>

    <section>
      <component-in-module name="hello"></component-in-module>
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
