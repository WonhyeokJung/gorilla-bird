<template>
  <div class="container p-40">
    <h2>회원가입</h2>
    <!-- event.preventDefault(): form의 기본 동작 이벤트인 새로고침 방지 -->
    <form action="" method="post" class="default-form" @submit.prevent="onSubmitForm">
      <label for="email">이메일</label>
      <input id="signup-email" v-model="signUpForms.email.value" :class="{ invalidEmail: !errors.email.value }" type="email" name="" required>
      <div class="form-border" />
      <label for="password">비밀번호</label>
      <input 
        id="signup-password" 
        ref="signupPassword" 
        v-model="signUpForms.password.value" 
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.*[A-Z]).{8,}" 
        type="password" 
        name=""
        placeholder="password"
        required
      >
      <div class="warning">{{ errors.password }}</div>
      <label for="password">비밀번호 확인</label>
      <input id="signup-confirm-password" v-model="signUpForms.confirmPassword.value" type="password" name="" placeholder="Confirm password" required>
      <div class="warning">ABC</div>
      <div class="warning">{{ errors.confirmPassword }}</div>
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
import { useUsersStore } from '~/stores/users';
definePageMeta({
  layout: false
});
console.log(process);
// if (process.client) {
//   const pw = document.querySelector('#signup-password');
//   pw.addEventListener('invalid', function (e) {
//     e.preventDefault();
//   });
// }
export default {
  name: 'SignUpView',
  setup() {
    const usersStore = useUsersStore();
    const router = useRouter();
    const signUpForms = reactive({
      valid: false,
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      terms: false,
    });

    const errors = reactive({
      email: !!signUpForms.email.value || '유효한 이메일이 아닙니다.',
      password: '',
      confirmPassword: '',
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

    // error handling
    // throw createError({ statusCode: 405, statusMessage: 'Error, Error'});

    const signupPassword = ref(null);
    watchEffect(() => {
      errors.password =  /(?=.*\d)(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.*[A-Z]).{8,}/.test(signUpForms.password) ? '' : '비밀번호는 대소문자, 숫자 그리고 특수문자 최소 하나씩 포함하고 8자 이상이어야 합니다.';
      errors.confirmPassword = /is/.test(signUpForms.confirmPassword) ? '' : '비밀번호가 일치하지 않습니다.';
    });
    onMounted(async () => {
      await nextTick(() => {

        signupPassword.value.addEventListener('invalid', function (e) {
          e.preventDefault();
        });
      });
    });

    return {
      signUpForms: toRefs(signUpForms),
      errors: toRefs(errors),
      onSubmitForm,
      usersStore,
      signupPassword,
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

  #signup-email:invalid:not(:focus):not(:placeholder-shown) {
    background: pink;
  }

  .warning {
    /* display: none; */
  }

  /* placeholder 투명 -> 인풋 value 없을 경우 placerholder-shown 적용  */
  #signup-password::placeholder {
    opacity: 0;
  }
  #signup-password:invalid:not(:placeholder-shown) + .warning {
    display: block;
    color: red;
  }
  /* #signup-confirm-password::placeholder {
    opacity: 0;
  } */
  #signup-confirm-password:invalid:not(:placeholder-shown) + .warning {
    display: block;
    color: pink;
  }
</style>
