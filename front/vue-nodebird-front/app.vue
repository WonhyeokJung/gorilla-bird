<template>
  <div>
    <NuxtLayout />
    <div class="grid-container">
      <NuxtPage class="xs-12 sm-12 lg-8" />
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
    const route = useRoute();
    const router = useRouter();
    const usersStore = useUsersStore();
    console.log(route.name);
    useHead({
      titleTemplate: '%s - Site Title'
    });
    if (!usersStore.me) {
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
    padding-top: 70px;
    /* 15px */
    font-size: 1.5rem;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  /** 빈공간 있을 경우 기본세팅(현재는 801~1023 사이 */
  .grid-container * {
    grid-column: auto;
  }
  /** 576px 이하 */
  @media screen and (max-width: 576px) {
    .xs-12 {
      grid-column: auto / span 12;
    }
  }

  @media screen and (min-width: 576px) {
    .sm-12 {
      grid-column: auto / span 12;
    }
  }
  /* grid-lg 정의 */
  @media screen and (min-width: 1024px) {
    .lg-auto {
      grid-column: auto;
    }
    .lg-4 {
      grid-column: auto / span 4;
    }
    .lg-8 {
      grid-column: auto / span 8;
    }
  }
  @media screen and (min-width: 1368px) {
    .xl-12 {
      grid-column: auto / span 12;
    }
  }
</style>
