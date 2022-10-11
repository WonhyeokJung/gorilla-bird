<template>
  <div class="index-container">
    <TheProfileCard></TheProfileCard>
    <PostForm v-if="!!user" />
    <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    <!-- mouse wheel 인식 위해 최소 1px -->
    <div ref="observe" style="height: 1px;"></div>
    <!-- <div id="scroll-observer" ref="observe">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div> -->
  </div>
</template>

<script>
definePageMeta({
  middleware: [() => { console.log('inline') }]
})
import PostCard from '~/components/ThePostCard.vue';
import PostForm from '~/components/ThePostForm.vue';
import TheProfileCard from '~/components/TheProfileCard.vue';
import { useUsersStore } from '~/stores/users';
import { usePostsStore } from '~/stores/posts';
export default {
  name: 'IndexView',
  components: { PostCard, PostForm, TheProfileCard },
  setup() {
    const name = 'Nuxt';
    const usersStore = useUsersStore();
    const postsStore = usePostsStore();
    const user = computed(() => usersStore.state.me.nickname || usersStore.state.me.email);
    const mainPosts = computed(() => postsStore.state.mainPosts);
    const observe = ref(null);
    onMounted(() => {
      // 초기데이터 삽입
      postsStore.loadPosts();
      const { $trigger } = useNuxtApp();
      $trigger('endLoading');

      const options = {
        root: null,
        // threshold: 0.99
      }
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          // 
          if (entry.isIntersecting) {
            console.log(entry)
            // 현재 보던 옵저버 해제
            // observer.unobserve(entry.target);
            // 새로 추가전 로딩 구현
            postsStore.loadPosts();
            // 새 옵저버 추가
            // io.observe(observe.value);
          }
        })
      }, options);
      io.observe(observe.value);
    });

    return {
      user,
      mainPosts,
      name,
      observe
    }
  },
}
</script>
<style scoped>
  /** 상위 컴포넌트의 클래스에도 적용이 가능하다. */
  /* .main {
    padding-top: 70px;
  } */

  #scroll-observer {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* Loader */
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #F86C06 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  .on-loading {
    display: none;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
