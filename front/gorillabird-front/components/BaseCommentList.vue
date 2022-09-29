<template>
  <div>
    <h5>
      <slot name="user" />
      <slot name="content" />
      <slot name="buttons" />
    </h5>
    <div v-if="comments" class="comment-list-container">
      <BaseCommentList v-for="comment in comments" :key="comment.id" :comments="comment.comments" :depth="depth + 1">
        <template #user>{{ comment.user }}</template>
        <template #content>
          <div>{{ comment.content }}</div>
        </template>
        <template #buttons>
          <button @click="onSubmitComment(comment)">추가</button>
          <button>삭제</button>
          {{ depth }}
        </template>
      </BaseCommentList>
    </div>
  </div>
</template>
<script>
import { usePostsStore } from '~/stores/posts';
export default {
  name: 'BaseCommentList',
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
    comments: {
      type: Array,
      default: () => {},
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
      required: true
    }
  },
  setup(props) {
    const postsStore = usePostsStore();
    const onSubmitComment = function (v) {
      postsStore.addComment({
        id: Date.now(),
        postId: v.postId,
        content: '중첩 추가는 어떻게 고려함?',
        user: v.user,
        comments: [],
        depth: props.depth,
        createdAt: Date.now()
      })
    }
    return {
      onSubmitComment
    }
  },
}
</script>
