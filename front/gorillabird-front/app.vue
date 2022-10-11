<template>
  <div>
    <NuxtLayout />
    <BaseLoadingBar class="loading" :loading="loadingStatus" />
    <div class="main-container">
      <div class="main-wrapper">
        <NuxtPage class="xs-12 sm-12 lg-12" />
      </div>
    </div>
    <Html>
      <Head>
        <Title>{{ dynamic }}</Title>
      </Head>
    </Html>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users';
// import useEventBus from '~/utils/bus';
import TheProfileCard from '~/components/TheProfileCard.vue';
import BaseLoadingBar from './components/BaseLoadingBar.vue';

export default {
  components: { BaseLoadingBar, TheProfileCard },
  setup() {
    useHead({
      titleTemplate: '%s - Site Title'
    });
    const route = useRoute();
    const router = useRouter();
    const usersStore = useUsersStore();
    const { $on, $off, $trigger } = useNuxtApp();
    // const { $on, $trigger } = useEventBus();
    const loadingStatus = ref(true);
    $on('startLoading', () => {
      loadingStatus.value = true;
    });
    
    $on('endLoading', () => {
      loadingStatus.value = false;
    });
    $trigger('startLoading');
    router.beforeEach((to, from, next) => {
      $trigger('startLoading');
      next();
    });
    
    if (!usersStore.state.me) {
      // router.push({ name: 'intro' });
      router.replace('/intro');
    }

    return {
      usersStore,
      dynamic: computed(() => route.name),
      loadingStatus
    }
  }
}
</script>
<style>
  @font-face {
      font-family: 'IBMPlexSansKR-Regular';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  html, body {
    width: 100vw;
    min-width: 375px;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 10px;
  }
  body {
    font-family: 'IBMPlexSansKR-Regular' !important;
    height: calc(100vh - 70px);
    padding-top: 70px;
    /* 15px */
    font-size: 1.5rem;
  }

  .main-container {
    display: flex;
    justify-content: center;
  }
  /* 하위 컨텐츠 width 결정 */
  .main-wrapper {
    width: 800px;
    max-width: 800px;
  }
</style>
