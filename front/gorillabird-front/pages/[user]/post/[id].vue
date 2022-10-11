<template>
  <div>
    <div v-if="post">
      <PostCard :post="post" />
    </div>
    <div v-else>
      해당 아이디의 게시물이 존재하지 않습니다.
      {{ post }}
    </div>
  </div>
</template>
<script>
import PostCard from '~/components/ThePostCard.vue';
import { usePostsStore } from '~~/stores/posts';
export default {
  name:'PostDetailView',
  components: {
    PostCard
  },
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
    const route = useRoute();
    const postsStore = usePostsStore();
    const { $on, $off, $trigger } = useNuxtApp();
    onMounted(() => {
      $trigger('endLoading');
      console.log(route.params.id, parseInt(route.params.id, 10))
    });
    return {
      post: computed(() => postsStore.state.mainPosts.find(v => v.id === parseInt(route.params.id, 10))),
    }
  }
}
</script>
