<style lang="scss" src="./hello.component.scss" scoped/>
<script lang="ts" src="./hello.component.ts"/>

<!--<template>-->
  <!--<div class="hello vue-component">-->
    <!--<h1>Hello!!!</h1>-->
    <!--<p>Greetings from {{receptionist.name}}</p>-->
  <!--</div>-->
<!--</template>-->

<!--<template lang="pug" src="./hello.component.pug"/>-->

<template lang="pug">
.hello.vue-component
  h1.h1 Hello!!!
  p Greetings from {{receptionist.name}}
</template>
