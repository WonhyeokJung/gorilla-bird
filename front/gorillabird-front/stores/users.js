export const useUsersStore = defineStore('users', () => {
  const state = reactive({
    me: { nickname: 'abc', email: 'abc@abc.com' },
    followingList: [],
    followerList: []
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

  function changeNickname(payload) {
    state.me.nickname = payload.nickname;
  }

  return {
    state,
    signUp,
    login,
    logout,
    changeNickname
  }
});
