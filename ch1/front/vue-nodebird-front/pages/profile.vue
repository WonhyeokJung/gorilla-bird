<template>
  <div>
    {{ data }} page
    <div class="container">
      <h2>{{ data }} 프로필</h2>
      <form action="" method="post" class="login-form">
        <label for="nickname">닉네임</label>
        <input type="nickname" name="" id="profile-nickname" :placeholder="data" required>
        <button type="submit">수정</button>
      </form>
      <div>
        <h3>팔로잉</h3>
        <FollowList></FollowList>
      </div>
      <div>
        <h3>팔로워</h3>
        <FollowList></FollowList>
      </div>
    </div>
  </div>
</template>
<script>
import FollowList from '~/components/TheFollowList.vue';
definePageMeta({
  layout: 'admin',
});
export default {
  components: { FollowList },
  setup() {
    const data = 'profile';
    // Nuxt function : <head></head> settings
    useHead({
      title: 'Profile'
    });

    return {
      data
    }
  },
}
</script>