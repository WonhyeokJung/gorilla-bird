<template>
  <div>
    <!-- <div v-for="(content, i) in " :key="i"> -->
      <PostCard></PostCard>
    <!-- </div> -->
  </div>
</template>

<script>
import PostCard from '~/components/ThePostCard.vue';
export default {
  components: { PostCard },
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