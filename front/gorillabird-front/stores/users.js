import * as api from '@/api';

export const useUsersStore = defineStore('users', () => {
  const router = useRouter();
  const state = reactive({
    // me: { nickname: 'abc', email: 'abc@abc.com' },
    me: '',
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
    ],
    hasMoreFollowings: true,
    hasMoreFollowers: true,
  });

  async function signUp(payload) {
    const { data, error } = await api.$_postApi('user', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    });
    if (error.value) {
      alert(error.value.message);
      return;
    }
    // 회원가입 동시에 로그인
    state.me = payload;
    await router.push('/');
  }
  function login(payload) {
    api.$_postApi('user/login', {
      email: payload.email,
      password: payload.password,
    });
    // api.$_getApi('login')
    state.me = {
      nickname: payload.nickname,
      email: payload.email,
    };
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

  // 실무에선 last Id를 가져와서(실시간으로 변하니까) 그것을 통해 불러옴(limit가 아님!).
  const limit = 10;

  const totalFollowings = 27;
  function loadMoreFollowings(payload) {
    if (state.hasMoreFollowings) {
      const diff = totalFollowings - state.followingList.length;
      const fakeFollowings = new Array(diff > limit ? limit : diff).fill().map(v => ({
        id: Math.floor(Math.random()*(10**13)),
        nickname: `fakeman${Math.floor(Math.random()*100)}`
      }));
      state.followingList = state.followingList.concat(fakeFollowings);
      state.hasMoreFollowings = fakeFollowings.length === limit;
    }
  }

  const totalFollowers = 31;
  function loadMoreFollowers(payload) {
    if (state.hasMoreFollowers) {
      const diff = totalFollowers - state.followerList.length;
      const fakeFollowers = new Array(diff > limit ? limit : diff).fill().map(v => ({
        id: Math.floor(Math.random()*(10**2)),
        nickname: `fakeman${Math.floor(Math.random()*100)}`
      }));
      state.followerList = state.followerList.concat(fakeFollowers);
      state.hasMoreFollowers = fakeFollowers.length === limit;
    }
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
    removeFollower,
    loadMoreFollowings,
    loadMoreFollowers,
  }
});
