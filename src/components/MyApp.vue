<style lang="scss" scoped>
#app {
  background: skyblue;
}
</style>
<script lang="ts" src="./MyApp.ts"></script>
<template>
  <div id="app" class="app-loaded container">
    <h1 class="h1">[Component] MyApp</h1>

    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
