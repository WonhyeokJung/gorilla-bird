export const useUsersStore = defineStore('users', () => {
  const state = reactive({
    me: { nickname: 'abc', email: 'abc@abc.com' },
  });

  function signUp(payload) {
    // 회원가입 동시에 로그인
    state.me = payload;
  }
  function login(payload) {
    state.me = payload;
  }
  function logout() {
    state.me = null;
  }

  return {
    state,
    signUp,
    login,
    logout
  }
});
