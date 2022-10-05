export const useUsersStore = defineStore('users', () => {
  const state = reactive({
    me: { nickname: 'abc', email: 'abc@abc.com' },
    followingList: [
      {
        id: 1,
        nickname: 'dummy1',
      },
      {
        id: 2,
        nickname: 'dummy2',
      },
      {
        id: 3,
        nickname: 'dummy3',
      },
      {
        id: 4,
        nickname: 'dummy5'
      }
    ],
    followerList: [
      {
        id: 1,
        nickname: 'followerdummy1',
      },
      {
        id: 2,
        nickname: 'dummy2',
      },
      {
        id: 3,
        nickname: 'dummy3',
      },
    ]
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

  function addFollowing(payload) {
    state.followingList.push(payload);
  }
  function addFollower(payload) {
    state.followerList.push(payload);
  }
  function removeFollowing(payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id);
    state.followingList.splice(index, 1);
  }
  function removeFollower(payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id);
    state.followerList.splice(index, 1);
  }

  return {
    state,
    signUp,
    login,
    logout,
    changeNickname,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower
  }
});
