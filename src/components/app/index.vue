<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>
<template lang="pug">
  #app.app-loaded.container
    transition(name="slide")
      router-view
</template>
