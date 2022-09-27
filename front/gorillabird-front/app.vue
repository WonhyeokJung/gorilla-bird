<template>
  <div>
    <NuxtLayout />
    <BaseLoadingBar class="loading" :loading="loadingStatus" />
    <div class="grid-container">
      <!-- login 혹은 회원가입 후 좌측은 프로필 컴포넌트 보이도록 -->
      <NuxtPage v-if="false" class="xs-12 sm-12 lg-12" />
      <template v-else>
        <aside class="xs-12 sm-12 lg-4">
          <TheProfileCard />
        </aside>
        <main class="xs-12 sm-12 lg-8">
          <NuxtPage />
        </main>
      </template>
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
import TheProfileCard from '~/components/TheProfileCard.vue'
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
    router.beforeEach(async (to, from, next) => {
      $trigger('startLoading');
      await next();
    });

    if (!usersStore.state.me) {
      router.push({ name: 'intro' });
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
    margin: 0;
    padding: 0;
    min-width: 375px;
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
</style>
