<template>
  <div>
    <div class="postcard-container">
      <img src="" alt="">
      <div>
        <h3>{{ post.id }}</h3>
        <div>{{ post }}</div>
        <div class="postcard-buttons-wrapper">
          <!-- 좋아요 / 리트윗 / 스크랩 -->
          <font-awesome-icon class="icon" icon="fa-solid fa-repeat" />
          <font-awesome-icon class="icon icon-instagram" :icon="['fa-brands', 'fa-instagram']" />
          <font-awesome-icon class="icon" :icon="[true ? 'fa-solid' : 'fa-regular', 'fa-heart']" />
          <font-awesome-icon class="icon" icon="fa-regular fa-comments" @click="onToggleComment" />
          <!-- dropdown 개발후 수정/삭제 추가 -->
          <font-awesome-icon class="icon" icon="fa-regular fa-trash-can" @click="onRemovePost" />
        </div>
      </div>
    </div>
    <template v-if="isCommentOpened">
      <BaseCommentForm :post-id="post.id" />
      <ClientOnly fallback-tag="span">
        <BaseCommentList :comments="post.comments" :depth="0" />
        <template #fallback>
          <p>Loading comments...</p>
        </template>
      </ClientOnly>
    </template>
  </div>
</template>
<script>
import { usePostsStore } from '~/stores/posts'
import BaseCommentForm from './BaseCommentForm.vue'
import BaseCommentList from './BaseCommentList.vue'
export default {
  name: 'ThePostCardComponent',
  components: { BaseCommentForm, BaseCommentList },
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
    const isCommentOpened = ref(false);
    const onToggleComment = function () {
      isCommentOpened.value = !isCommentOpened.value;
    }
    const onRemovePost = function () {
      postsStore.removeMainPost({
        id: props.post.id,
      });
    }

    return {
      isCommentOpened,
      onToggleComment,
      onRemovePost
    }
  },
}
</script>
<style scoped>
  .postcard-container {
    max-width: 800px;
    padding: 1rem 8rem;

    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
  }
  .postcard-buttons-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-inline: 8px;
  }

  .icon:hover {
    cursor: pointer;
  }

  .fa-instagram {
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
    background: -webkit-radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
    /* background-clip: text; */
    /* -webkit-background-clip: text; */
    /* color: rgba(0,0,0,0); */
    -webkit-text-fill-color: transparent;
    
    color: white;
    border-radius: 5px;
  }

  .icon:hover:not(.fa-instagram):not(.fa-heart) {
    color: lightblue;
    filter: drop-shadow(crimson 0px 0 0.4rem);
    will-change: filter;
  } 

  .fa-heart path {
    font-size: 1rem;
  }
  .fa-heart:hover {
    color: rgba(237, 119, 102, 1);
    /* text-shadow: rgb(209, 48, 48) 1px 0 10px; */
    -webkit-filter: drop-shadow(rgb(209, 48, 48) 0px 0 0.5rem);
      filter: drop-shadow(rgb(209,48,48) 0px 0 0.5rem);
    -webkit-transform: scale(1.125, 1.125);
      transform: scale(1.125, 1.125);
    -webkit-transition: -webkit-transfrom .5s;
      transition: transform .5s;
    /* will-change: filter; */
    /* isolation: isolate; */
  }

  .fa-instagram:hover {
    transform: scale(1.125);
  }
</style>
