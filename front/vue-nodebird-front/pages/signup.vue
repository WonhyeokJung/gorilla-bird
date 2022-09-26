<template>
  <div class="container p-40 center-block w-500">
    <div class="intro-logo mb-50" style="text-align: center;">
      <img class="logo" src="../assets/gorilla-2.png" alt="Logo">
      <h1 class="mt-0 mb-0 ff-solid">Welcome to GorillaBird</h1>
      <p>already have an account ? <Nuxt-link to="/intro">Login</Nuxt-link></p>
    </div>
    <!-- event.preventDefault(): form의 기본 동작 이벤트인 새로고침 방지 -->
    <form ref="signupForm" nmae="test" action="" method="post" class="default-form w-300 center-block" @submit.prevent="onSubmitForm">
      <label for="signup-email">Email</label>
      <input 
        id="signup-email" 
        v-model="signUpForms.email.value" 
        :class="[{ invalid: errors.email.value.length > 0 || !signUpForms.email.value, 'invalid-warning': !!submit }, 'border-none', 'outline-none']" 
        type="email" 
        name="" 
        placeholder="e-mail" 
        required 
        @focus="onFocus" 
        @invalid.prevent
      >
      <div :class="{ 'text-warning': errors.email.value.length > 0 }">{{ errors.email.value }}</div>
      <label for="password">Password</label>
      <!-- css로 (pattern invalid) 조정 -->
      <input 
        id="signup-password"
        v-model="signUpForms.password.value"
        :class="[{ invalid: errors.password.value.length > 0, 'invalid-warning': !!submit }, 'border-none', 'outline-none']"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.*[A-Z]).{8,}" 
        type="password" 
        name=""
        placeholder="password"
        required
        @focus="onFocus" 
        @invalid.prevent
      >
      <div :class="[errors.password.value.length > 0 ? 'text-warning' : '']">{{ errors.password.value }}</div>
      <!-- watcheffect + js 이용 -->
      <label for="password">Confirm Password</label>
      <input 
        id="signup-confirm-password" 
        v-model="signUpForms.confirmPassword.value" 
        :class="[{ invalid: errors.confirmPassword.value.length > 0 || errors.password.value.length > 0, 'invalid-warning': !!submit }, 'border-none', 'outline-none']" 
        type="password" 
        name="" 
        placeholder="Confirm password" 
        required 
        @focus="onFocus" 
        @invalid.prevent
      >
      <div :class="[errors.confirmPassword.value.length > 0 ? 'text-warning' : '']">{{ errors.confirmPassword.value }}</div>
      <label for="password">Nickname</label>
      <input 
        id="signup-nickname" 
        v-model="signUpForms.nickname.value"
        :class="[{ invalid: !signUpForms.nickname.value, 'invalid-warning': !!submit }, 'border-none', 'outline-none']" 
        type="nickname" 
        name="" 
        placeholder="nickname" 
        required 
        @focus="onFocus" 
        @invalid.prevent
      >
      <button type="submit" :disabled="signUpForms.valid.value" @click="onSubmit">회원가입</button>
      <div class="terms">By joining, you agree to the <a href="#">terms</a> and privacy policy.</div>
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
export default {
  name: 'SignUpView',
  setup() {
    // state management
    const usersStore = useUsersStore();
    // vue-router
    const router = useRouter();
    // plugin
    const { $trigger, $validCheck } = useNuxtApp();

    const signUpForms = reactive({
      valid: false,
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    });
    const errors = reactive({
      // email: computed(() => /^[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/.test(signUpForms.email) ? '' : '이메일 양식이 맞지 않습니다.'),
      email: computed(() => $validCheck('email', signUpForms.email)),
      password: computed(() => $validCheck('password', signUpForms.password)),
      confirmPassword: computed(() => $validCheck('confirmPassword', signUpForms.password, signUpForms.confirmPassword)),
    });

    const submit = ref(false);
    const onFocus = () => submit.value = false;
    const onSubmit = () => submit.value = true;

    const onSubmitForm = async function () {
      // error message 있을 시, 가입 방지
      for (let error of Object.values(errors)) {
        if (error) return;
      }
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

    onMounted(() => {
      $trigger('endLoading');
    })

    // error handling
    // throw createError({ statusCode: 405, statusMessage: 'Error, Error'});

    return {
      signUpForms: toRefs(signUpForms),
      errors: toRefs(errors),
      // valids,
      onSubmitForm,
      usersStore,
      submit,
      onSubmit,
      onFocus
    }
  },
}
</script>
<style scoped>
  .container {
    position: relative;
    /* height: calc(100vh - 70px); */
  }

  .default-form {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .invalid {
    border-bottom: 2px solid grey;
  }

  .invalid-warning {
    border-color: red;
  }

  input.invalid:not(:focus):not(:placeholder-shown) {
    background: pink;
  }

  .text-warning {
    display: none;
    font-size: 1.2rem;
  }

  label {
    margin-block: 10px;
    font-size: 1.6rem;
  }

  input {
    height: 3.6rem;
    font-size: 2rem;
    text-indent: 1rem;
  }
  /* placeholder 투명 -> 인풋 value 없을 경우 placerholder-shown 적용  */
  input::placeholder {
    opacity: 0;
  }
  input:not(:placeholder-shown) + .text-warning{
    display: block;
    color: red;
  }
  
  a {
    text-decoration: none;
    color: goldenrod;
  }

  .terms {
    color: grey;
    font-size: 1.3rem;
    text-align: center;
  }

  button {
    height: 4rem;
    margin-top: 50px;
    border: none;
    border-radius: 5px;
    background-color: black;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;

    cursor: pointer;
  }
</style>
