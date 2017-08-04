<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>
<template>
  <div id="app" class="app-loaded container">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
