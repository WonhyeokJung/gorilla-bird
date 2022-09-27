<template>
  <div>
    <div class="container">
      <img src="" alt="">
      <div>
        <h3>{{ post.id }}</h3>
        <div>{{ post }}</div>
        <div>
          <!-- 좋아요 / 리트윗 / 스크랩 -->
          <button>twitter retweet</button>
          <button>insta icon</button>
          <button>empty heart</button>
          <button>
            <i>comment</i>
          </button>
          <!-- dropdown 개발후 수정/삭제 추가 -->
          <div><button @click="onRemovePost">삭제</button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { usePostsStore } from '~/stores/posts'
export default {
  name: 'ThePostCardComponent',
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
  props: {
    post: {
      type: Object,
      default: undefined
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
    const postsStore = usePostsStore();
    const onRemovePost = function () {
      postsStore.removeMainPost({
        id: props.post.id,
      });
    }

    return {
      onRemovePost
    }
  },
  data() {
    return {
      sampleData: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {}
}
</script>
<style scoped>

</style>
