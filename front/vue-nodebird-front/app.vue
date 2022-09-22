<template>
  <div>
    <NuxtLayout />
    <div class="grid-container">
      <!-- login 혹은 회원가입 후 좌측은 프로필 컴포넌트 보이도록 -->
      <NuxtPage class="xs-12 sm-12 lg-12" />
    </div>
    <Html>
      <Head>
        <Title>{{ dynamic }}</Title>
      </Head>
    </Html>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users'
export default {
  setup() {
    useHead({
      titleTemplate: '%s - Site Title'
    });
    const route = useRoute();
    const router = useRouter();
    const usersStore = useUsersStore();
    console.log(route.name);
    if (!usersStore.state.me) {
      router.push({ name: 'intro' })
    }
    return {
      usersStore,
      dynamic: computed(() => route.name)
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
  }
  html {
    font-size: 10px;
  }
  body {
    font-family: 'IBMPlexSansKR-Regular';
    height: calc(100vh - 70px);
    padding-top: 70px;
    /* 15px */
    font-size: 1.5rem;
  }
</style>
