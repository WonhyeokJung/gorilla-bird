<template>
  <div class="index-container">
    <TheProfileCard></TheProfileCard>
    <PostForm v-if="!!user" />
    <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    <BaseInfiniteScrollComp />
  </div>
</template>

<script>
definePageMeta({
  middleware: [
    () => { 
      console.log('inline Middleware');
    }
  ]
});

import PostCard from '~/components/ThePostCard.vue';
import PostForm from '~/components/ThePostForm.vue';
import TheProfileCard from '~/components/TheProfileCard.vue';
import BaseInfiniteScrollComp from '~/components/BaseInfiniteScrollComp.vue'
import { useUsersStore } from '~/stores/users';
import { usePostsStore } from '~/stores/posts';
export default {
  name: 'IndexView',
  components: { PostCard, PostForm, TheProfileCard, BaseInfiniteScrollComp },
  setup() {
    const name = 'Nuxt';
    const usersStore = useUsersStore();
    const postsStore = usePostsStore();
    const user = computed(() => usersStore.state.me.nickname || usersStore.state.me.email);
    const mainPosts = computed(() => postsStore.state.mainPosts);

    onMounted(() => {
      // 초기데이터 삽입
      postsStore.loadPosts();
      const { $trigger } = useNuxtApp();
      $trigger('endLoading');
    });

    return {
      user,
      mainPosts,
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
