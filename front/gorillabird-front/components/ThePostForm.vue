<template>
  <div class="post-form-container">
    <form ref="form" class="write-post-form" action="" @submit.prevent="onSubmitForm">
      <textarea id="write-post" v-model="content" name="" cols="30" :placeholder="successMessages || '어떤 신기한 일이 있었나요?'" @input="onChangeTextarea" @keyup.enter.exact="onSubmitForm()" />
      <div style="display: flex; justify-content: end;">
        <button type="button">이미지 업로드</button>
        <button type="submit">등록하기</button>
      </div>
    </form>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users';
import { usePostsStore } from '~/stores/posts';
export default {
  name: 'ThePostForm',
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
    const usersStore = useUsersStore();
    const successMessages = ref('');
    const content = ref('');
    const success = ref(false);
    const user = computed(() => usersStore.state.me);
    const onChangeTextarea = function () {
      console.log('input is detected');
      success.value = false;
      // 등록 성공한 게시글 내용 지우기
      successMessages.value = '';
    }
    const onSubmitForm = async function () {
      // validation 체크
      try {
        await postsStore.addMainPost({
          content: content.value,
          // 백엔드가 보내줄 내용이라 타입을 미리 물어보고 확인해야 함.
          user: {
            nickname: usersStore.state.me.nickname
          },
          comments: [],
          images: [],
          id: Date.now(),
          createdAt: Date.now()  
        });
        success.value = true;
        // textarea 아래 호출
        successMessages.value = '게시글 등록 성공!';
        content.value = '';
      } catch(err) {
        console.log(err);
      }
    }

    return {
      content,
      successMessages,
      onChangeTextarea,
      onSubmitForm
    }
  },
}
</script>
<style scoped>
  @import '~/assets/css/the-post-form';
</style>
