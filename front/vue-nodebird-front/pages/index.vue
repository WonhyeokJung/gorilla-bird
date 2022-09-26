<template>
  <div>
    <PostForm v-if="!!user" />
    {{ user }}님, 어서오세요!
    <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    <div @click="indexStore.increment">{{ indexStore.count }}, {{ indexStore.doubleCount }}</div>
  </div>
</template>

<script>
import PostCard from '~/components/ThePostCard.vue';
import PostForm from '~/components/ThePostForm.vue'
import { useIndexStore } from '~/stores/index';
import { useUsersStore } from '~/stores/users';
import { usePostsStore } from '~/stores/posts';
export default {
  name: 'IndexView',
  components: { PostCard, PostForm },
  setup() {
    const name = 'Nuxt';
    const indexStore = useIndexStore();
    const usersStore = useUsersStore();
    const postsStore = usePostsStore();
    const user = computed(() => usersStore.state.me.nickname || usersStore.state.me.email);
    const mainPosts = computed(() => postsStore.state.mainPosts);

    onMounted(() => {
      const { $trigger } = useNuxtApp();
      $trigger('endLoading');
    });

    return {
      user,
      mainPosts,
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
