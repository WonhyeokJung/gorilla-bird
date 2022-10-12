<template>
  <!-- mouse wheel 인식 위해 최소 1px -->
  <div ref="observe" style="height: 1px;" />
  <!-- <div id="scroll-observer" ref="observe">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div> -->
</template>
<script>
import { usePostsStore } from '~~/stores/posts'
export default {
  name: 'BaseInfiniteScrollComp',
  components: {},
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
    const postsStore = usePostsStore();
    // Observer
    const hasMorePost = computed(() => postsStore.state.hasMorePost);
    const observe = ref(null);
    onMounted(() => {
      const options = {
        root: null,
        // threshold: 0.99
      }
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          // 
          if (entry.isIntersecting && hasMorePost.value) {
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
      observe
    }
  },
}
</script>
<style scoped>
  /* ------------------------------------------------------ */
  /* Observer Loading comp */
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
