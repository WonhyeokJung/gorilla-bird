<template>
  <div>
    Index Page === Homepage
    <br>
    Hello, {{ name }}
  </div>
</template>

<script>
export default {
  setup() {
    const name = 'Nuxt';
    return {
      name,
    }
  },
}
</script>
<style scoped>
  /** 상위 컴포넌트의 클래스에도 적용이 가능하다. */
  /* .main {
    padding-top: 70px;
  } */
</style>