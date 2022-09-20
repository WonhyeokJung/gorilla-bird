<template>
  <div class="login-form-container">
    <div v-if="!isLoggedIn" class="card card-sm center-block">
      <div style="text-align: center">
        <h2 class="mb-0">로그인</h2>
      </div>
      <form action="" method="post" class="login-form" @submit.prevent="onSubmitForm">
        <div ref="emailInputContainer" :class="['default-input-container']">
          <label for="login-email">이메일</label>
          <input id="login-email" ref="loginEmail" v-model="email" type="email" name="" required>
          <div class="form-border" />
        </div>
        <div ref="passwordInputContainer" :class="['default-input-container']">
          <label for="password">비밀번호</label>
          <input id="password" ref="loginPassword" v-model="password" type="password" name="" required>
          <div class="form-border" />
        </div>
        <Nuxt-link class="signup-link" to="/signup">Don't have an account?</Nuxt-link>
        <div class="button-container">
          <button type="submit" :disabled="!valid.value" @click="onLogin">로그인</button>
        </div>
      </form>
      {{ email }}
    </div>
    <div v-else>
      <h3>{{ isLoggedIn.nickname || isLoggedIn.email }}님 로그인 되었습니다.</h3>
      <div class="button-container">
        <button type="" @click="onLogout">로그아웃</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users'
export default {
  name: 'TheLoginFormComponent',
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
    const valid = ref(false);
    const email = ref('');
    const password = ref('');
    const usersStore = useUsersStore();
    const isLoggedIn = computed(() => usersStore.state.me);
    const onLogin = function () {
      usersStore.login({
        email: email.value,
        password: password.value
      });
    }
    const onLogout = function () {
      usersStore.logout()
    }

    const emailInputContainer = ref(null);
    const passwordInputContainer = ref(null);
    const loginEmail = ref(null);
    const loginPassword = ref(null);
    onMounted( () => {
      loginEmail.value.addEventListener('focus', function (e) {
        emailInputContainer.value.classList.add('focus');
      });
      loginEmail.value.addEventListener('focusout', function (e) {
        if (!email.value.length) {
          emailInputContainer.value.classList.remove('focus');
        }
      });
      loginPassword.value.addEventListener('focus', function (e) {
        passwordInputContainer.value.classList.add('focus');
      })
      loginPassword.value.addEventListener('focusout', function (e) {
        if (!password.value.length) {
          passwordInputContainer.value.classList.remove('focus');
        }
      })
    });

    return {
      valid,
      email,
      password,
      usersStore,
      isLoggedIn,
      onLogin,
      onLogout,
      loginEmail,
      loginPassword,
      emailInputContainer,
      passwordInputContainer
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
  .card {
    border: 0.1rem solid silver;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0.2rem 0.2rem 0.7rem 0.1rem grey;
  }

  .card-sm {
    width: 30rem;
    /* height: 200px; */
  }

  .login-form {
    display: flex;
    flex-direction: column;
  }

  .default-input-container {
    position: relative;
    margin-top: 1.5rem;
  }
  
  .default-input-container > input {
    display: block;
    width: 100%;
    height: 3.6rem;

    border: none;
    outline: none;

    font-size: 2rem;
  }

  .default-input-container > label {
    display: block;
    position: absolute;
    top: 1rem;
    margin-top: 0;
    
    color: grey;
    font-size: 1.5rem;
    cursor: text;

    transition: all 0.2s ease-out;
    transform: translate3d(0, 0rem, 0);
    transform-origin: bottom right;

    -webkit-transition: all 0.2s ease-out;
    -webkit-transform: translate3d(0, 0rem, 0);
    -webkit-transform-origin: bottom right;
    -webkit-font-smoothing: antialiased;
  }

  .default-input-container.focus > label {
    font-size: 1rem;
    color: #F7Af05;

    cursor: default;

    transition: all 0.2s ease-out;
    transform: translate3d(0, -2rem, 0);
    transform-origin: top left;

    -webkit-transition: all 0.2s ease-out;
    -webkit-transform: translate3d(0, -2rem, 0);
    -webkit-transform-origin: top left;
    -webkit-font-smoothing: antialiased;
  }

  /** input 밑줄 */
  .form-border {
    width: 100%;
    height: 1px;

    /* background: -webkit-linear-gradient(right, #82fdff, #0baae9); */
    border-bottom: 1px solid black;
  }

  input:focus + .form-border {
    border-bottom: 2px solid #F7AF05;
  }

  /** 가입 */
  .signup-link {
    font-size: 1.3rem;
    text-align: right;
    color: lightslategray;
    text-decoration: none;
  }

  /** 로그인 버튼 */
  .button-container {
    margin-top: 3rem;
    text-align: center;
  }

  button {
    width: 10rem;

    margin: 0 auto;
    padding: 1rem;
    border: 0.1rem solid black;
    border-radius: 0.5rem;

    background-color: white;
    color: green;
    font-size: 1.5rem;
    cursor: pointer;
  }

  button:disabled {
    /* border-box시 border까지 칠함. */
    background: content-box red;
  }
</style>
