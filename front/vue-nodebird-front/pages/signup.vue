<template>
  <div class="container p-40">
    <h2>회원가입</h2>
    <!-- event.preventDefault(): form의 기본 동작 이벤트인 새로고침 방지 -->
    <form ref="signupForm" action="" method="post" class="default-form" @submit.prevent="onSubmitForm">
      <label for="signup-email">이메일</label>
      <input id="signup-email" v-model="signUpForms.email.value" :class="{ invalidEmail: !!errors.email.value }" type="email" name="" placeholder="e-mail" required>
      <div :class="[errors.email.value.length > 0 ? 'warning' : 'valid']">{{ errors.email.value }}</div>
      <div class="form-border" />
      <label for="password">비밀번호</label>
      <!-- css로 (pattern invalid) 조정 -->
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
      <div :class="[errors.password.value.length > 0 ? 'warning' : 'valid']">{{ errors.password.value }}</div>
      <!-- watcheffect + js 이용 -->
      <label for="password">비밀번호 확인</label>
      <input id="signup-confirm-password" v-model="signUpForms.confirmPassword.value" type="password" name="" placeholder="Confirm password" required>
      <div :class="[errors.confirmPassword.value.length > 0 ? 'warning' : 'valid']">{{ errors.confirmPassword.value }}</div>
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
      email: '',
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
    watchEffect(() => {
      errors.email = /^[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/.test(signUpForms.email) ? '' : '이메일 양식이 맞지 않습니다.';
      errors.password =  /(?=.*\d)(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.*[A-Z]).{8,}/.test(signUpForms.password) ? '' : '비밀번호는 대소문자, 숫자 그리고 특수문자 최소 하나씩 포함하고 8자 이상이어야 합니다.';
      // 일치 검사
      errors.confirmPassword = (signUpForms.password === signUpForms.confirmPassword) ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
    });

    // templates ref
    const signupPassword = ref(null);
    const signupForm = ref(null);
    onMounted(async () => {
      await nextTick(() => {
        Array.from(signupForm.value.children).forEach((tag) => {
          if (tag.tagName === 'INPUT') {
            tag.addEventListener('invalid', function (e) {
              e.preventDefault();
              // invalid시 특정 div에 클래스명 넣어 정보 입력 유도
            });
          }
        });
      });
    });

    return {
      signUpForms: toRefs(signUpForms),
      errors: toRefs(errors),
      onSubmitForm,
      usersStore,
      signupForm,
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
    display: none;
    font-size: 1rem;
  }

  .valid {
    display: none;
  }

  /* placeholder 투명 -> 인풋 value 없을 경우 placerholder-shown 적용  */
  input::placeholder {
    opacity: 0;
  }
  input:not(:placeholder-shown) + .warning{
    display: block;
    color: red;
  }
  #signup-password::placeholder {
    opacity: 0;
  }
  #signup-password:invalid:not(:placeholder-shown) + .warning {
    display: block;
    color: red;
  }
</style>
