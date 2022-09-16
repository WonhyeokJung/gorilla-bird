<template>
  <div class="container p-40">
    <h2>회원가입</h2>
    <!-- event.preventDefault(): form의 기본 동작 이벤트인 새로고침 방지 -->
    <form action="" method="post" class="default-form" @submit.prevent="onSubmitForm">
      <label for="email">이메일</label>
      <input id="signup-email" v-model="signUpForms.email.value" :class="{ invalidEmail: !errors.email.value }" type="email" name="" required>
      <div class="form-border" />
      <label for="password">비밀번호</label>
      <input id="signup-password" v-model="signUpForms.password.value" type="password" name="" required>
      <label for="password">비밀번호 확인</label>
      <input id="signup-confirm-password" v-model="signUpForms.passwordCheck.value" type="password" name="" required>
      <label for="password">닉네임</label>
      <input id="signup-nickname" v-model="signUpForms.nickname.value" type="nickname" name="" required>
      <input id="signup-checkbox" v-model="signUpForms.terms.value" type="checkbox" required>
      <label for="terms"><a href="#">이용약관</a>에 동의합니다.</label>
      <div class="form-border" />
      <button type="submit" :disabled="signUpForms.valid.value">회원가입</button>
      {{ signUpForms }}
      {{ usersStore.state }}
    </form>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users'
definePageMeta({
  layout: false
})
export default {
  name: 'SignUpView',
  setup() {
    const usersStore = useUsersStore();
    const router = useRouter();
    const signUpForms = reactive({
      valid: false,
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
      terms: false,
    });
    const errors = reactive({
      email: !!signUpForms.email.value || '유효한 이메일이 아닙니다.'
    });

    const onSubmitForm = async function () {
      try {
        await usersStore.signUp({
          nickname: signUpForms.nickname,
          email: signUpForms.email
        });
        await router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
    return {
      signUpForms: toRefs(signUpForms),
      errors: toRefs(errors),
      onSubmitForm,
      usersStore,
    }
  },
}
</script>
<style scoped>
  .container {
    position: relative;
    height: calc(100vh - 70px);
  }

  .p-40 {
    padding: 40px;
  }

  .default-form {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .invalidEmail {
    border-bottom: 3px solid red;
  }
</style>
