<template>
  <div>
    <!-- <div v-for="(content, i) in " :key="i"> -->
      <PostCard></PostCard>
    <!-- </div> -->
    <div @click="indexStore.increment">{{ indexStore.count }}, {{ indexStore.doubleCount }}</div>
  </div>
</template>

<script>
import PostCard from '~/components/ThePostCard.vue';
import { useIndexStore } from '~/stores/index.js';
export default {
  name: 'IndexView',
  components: { PostCard },
  setup() {
    const name = 'Nuxt';
    const indexStore = useIndexStore();
    return {
      name,
      indexStore
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
