export const usePostsStore = defineStore('posts', () => {
  const state = reactive({
    mainPosts: [],
  });

  function addMainPost(payload) {
    console.log('add function activated');
    // 서버에 게시글 요청
    // ...
    state.mainPosts.unshift(payload);
  }

  function removeMainPost(payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  }

  return {
    state: toRefs(state),
    addMainPost,
    removeMainPost
  }
});
