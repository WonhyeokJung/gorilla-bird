<template>
  <div class="intro-container">
    <div class="intro-logo">
      <img class="logo" src="../assets/gorilla-2.png" alt="">
      <h1 class="mt-0 mb-0">GorillaBird</h1>
    </div>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from '~/components/TheLoginForm.vue';
definePageMeta({
  layout: false,
});

export default {
  name: 'IntroView',
  components: { LoginForm },
  directives: {},
  provide() {
    return {
    }
  },
  inject() {
    return {
    }
  },
  props: {},
  setup() {
    onMounted(() => {
      const { $trigger } = useNuxtApp();
      $trigger('endLoading');
    });
  },
}
</script>
<style scoped>
  .intro-container {
    padding-top: 40px;
    user-select: none;
    -webkit-user-select: none;

    -webkit-user-drag: none;
  }
  .intro-logo {
    text-align: center;
  }
</style>
