<template>
  <div class="login-form-container">
    <div v-if="!isLoggedIn" class="card card-sm">
      <div style="text-align: center">
        <h2>로그인</h2>
      </div>
      <form action="" method="post" class="login-form" @submit.prevent="onSubmitForm">
        <label for="email">이메일</label>
        <input id="email" v-model="email" type="email" name="" required>
        <div class="form-border" />
        <label for="password">비밀번호</label>
        <input id="password" v-model="password" type="password" name="" required>
        <div class="form-border" />
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
    return {
      valid,
      email,
      password,
      usersStore,
      isLoggedIn,
      onLogin,
      onLogout
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
  .login-form-container {
    position: relative;
    height: calc(100vh - 70px);
  }
  .card {
    position: absolute;
    top: 10%;
    left: 50%;
    border: 0.1rem solid silver;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0.2rem 0.2rem 0.2rem grey;
    transform: translate(-50%, 0%);
  }
  .card-sm {
    width: 30rem;
    /* height: 200px; */
  }

  .login-form {
    display: flex;

    flex-direction: column;
    align-items: left;
  }
  label {
    display: block;
    margin-top: 1rem;
  }
  input {
    display: block;
    height: 2.4rem;

    margin: 0;
    border: none;
    outline: none;

    font-size: 2rem;
  }

  input:focus + .form-border {
    border-bottom: 2px solid #F7AF05;
  }

  .form-border {
    width: 100%;
    height: 1px;

    /* background: -webkit-linear-gradient(right, #82fdff, #0baae9); */
    border-bottom: 1px solid black;
  }

  .signup-link {
    font-size: 1.3rem;
    text-align: right;
    color: lightslategray;
    text-decoration: none;
  }

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
