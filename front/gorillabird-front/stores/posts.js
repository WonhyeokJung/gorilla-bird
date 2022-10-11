export const usePostsStore = defineStore('posts', () => {
  const state = reactive({
    mainPosts: [],
    hasMorePost: true,
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

  function addComment(payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].comments.unshift(payload);
  }

  function removeComment(payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].comments.splice(index, 1);
    // 중첩 코멘트 구현
  }

  const limit = 10;
  function loadPosts() {
    if (state.hasMorePost) {
      const fakePosts = new Array(limit).fill().map(v => ({
        id: Math.floor(Math.random() * (10**13)),
        user: {
          id: 1,
          nickname: 'abc'
        },
        content: `hello infinite scrolling ${Math.floor(Math.random() * (10**13))}`,
        comments: [],
        images: [],
      }));
      state.mainPosts = state.mainPosts.concat(fakePosts);
      state.hasMorePost = fakePosts.length === limit;
    }
  }

  return {
    state: toRefs(state),
    addMainPost,
    removeMainPost,
    addComment,
    removeComment,
    loadPosts
  }
});
