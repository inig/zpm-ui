<template>
  <div class="container">
    <remote-component url="https://static.dei2.com/experience/Greeting.vue">
      <div slot="loading"
           style="width: 24px; height: 24px;">
        <img src="https://static.dei2.com/experience/loading.gif"
             alt="loading"
             style="width: 24px; height: 24px;">
      </div>
    </remote-component>
  </div>
</template>

<script>

export default {
  name: 'RemoteComponentExample',
  methods: {
  }
};
</script>

<style scoped>
.container {
  width: 600px;
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
