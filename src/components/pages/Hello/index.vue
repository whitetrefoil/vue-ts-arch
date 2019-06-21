<style lang="scss">
.hello {
  background-color: pink;
  font-size: 150%;

  p {
    color: #333333;
  }

  input::placeholder {
    color: #666666;
  }

  .image {
    width: 160px;
    height: 160px;
    background: no-repeat center center url("cat.jpg");
    background-size: 160px 160px;
  }
}
</style>

<template>
  <div class="hello">
    <h1 class="h1">[component] HelloPage</h1>

    <h3 class="h3">Hello!!!</h3>

    <p>{{greeting}}</p>

    <p>
      <button type="button" class="btn btn-danger" @click="changeReceptionist">Another receptionist!</button>
    </p>

    <section>
      <router-view name="shared-comp-here"></router-view>
    </section>

    <section>
      <Nested name="hello"></Nested>
    </section>

    <section>
      <h3 class="h3">url-loader test</h3>
      <div class="image"></div>
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
