<template>
  <div class="container p-40">
    <h2>회원가입</h2>
    <!-- event.preventDefault(): form의 기본 동작 이벤트인 새로고침 방지 -->
    <form action="" method="post" class="default-form" @submit.prevent="onSubmitForm">
      <label for="email">이메일</label>
      <input v-model="signUpForms.email.value" :class="{ invalidEmail: !errors.email.value }" type="email" name="" id="signup-email" required>
      <div class="form-border"></div>
      <label for="password">비밀번호</label>
      <input v-model="signUpForms.password.value" type="password" name="" id="signup-password" required>
      <label for="password">비밀번호 확인</label>
      <input v-model="signUpForms.passwordCheck.value" type="password" name="" id="signup-confirm-password" required>
      <label for="password">닉네임</label>
      <input v-model="signUpForms.nickname.value" type="nickname" name="" id="signup-nickname" required>
      <input v-model="signUpForms.terms.value" type="checkbox" id="signup-checkbox" required>
      <label for="terms"><a href="#">이용약관</a>에 동의합니다.</label>
      <div class="form-border"></div>
      <button type="submit" :disabled="signUpForms.valid.value">회원가입</button>
      {{ signUpForms }}
      {{ password }}
    </form>
  </div>
</template>
<script>
definePageMeta({
  layout: false
})
export default {
  name: 'SignUpView',
  setup() {
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

    const onSubmitForm = function () {
      alert('회원가입 시도');
    }
    return {
      signUpForms: toRefs(signUpForms),
      errors: toRefs(errors),
      onSubmitForm
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
