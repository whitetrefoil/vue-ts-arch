<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>
<template lang="pug">
  .hello.vue-component
    h1.h1 Hello!!!
    p {{greeting}}
    p
      button.btn.btn-danger(@click="changeReceptionist()") Another receptionist!

    section
      h1 Inner section "another"
      router-view(name="another")
</template>
