<template>
  <div class="comment-form-container">
    <form action="" @submit.prevent="onSubmitForm">
      <label for="write-comment" />
      <textarea id="write-comment" v-model="content" name="" :placeholder="successMessages || '댓글을 입력해주세요.'" @input="onChangeTextArea" />
      <button type="submit">짠</button>
    </form>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users';
import { usePostsStore } from '~/stores/posts';
export default {
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
    postId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const postsStore = usePostsStore();
    const usersStore = useUsersStore();
    const me = computed(() => usersStore.state.me);
    const content = ref('');
    const successMessages = ref('');
    const success = ref(false);
    const onChangeTextArea = function (v) {
      if (v.length) {
        success.value = false;
        successMessages.value = '';
      }
    }
    const onSubmitForm = async function () {
      // validation 체크
      try {
        await postsStore.addComment({
          id: Date.now(),
          postId: props.postId,
          content: content.value,
          user: {
            // 닉네임 변경시 유동적 변경
            nickname: computed(() => usersStore.state.me.nickname),
          },
          // 중첩 코멘트 담는건 쉬운데.. 삭제는..?depth 이용?
          comments: [],
          createdAt: Date.now(),
        });
        success.value = true;
        // textarea 아래 호출
        successMessages.value = '댓글이 작성되었습니다.';
        content.value = '';
      } catch(err) {
        console.log(err);
      }
    }

    return {
      me,
      content,
      success,
      successMessages,
      onChangeTextArea,
      onSubmitForm
    }
  },
}
</script>
