<template>
  <div v-if="loading">
    <div class="lds-facebook">
      <div />
      <div />
      <div />
    </div>
    <!-- z-index 추가시 navbar도 가리기 가능. -->
    <div style="position:fixed; width: 100vw; height: 100vh; -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); z-index: 9998;" />
  </div>
</template>
<script>
export default {
  name: 'BaseLoadingBar',
  props: {
    loading: {
      type: Boolean,
      default: true,
      required: true
    }
  },
}
</script>
<style scoped>
.lds-facebook {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 47%;
  left: 47%;
  z-index: 9999;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #42b883;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0s;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}
</style>
