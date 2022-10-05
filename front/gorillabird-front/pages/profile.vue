<template>
  <div>
    {{ me }} page
    <div class="container">
      <h2>{{ me }} 프로필</h2>
      <form action="" method="post" class="login-form" @submit.prevent="onChangeNickname">
        <label for="nickname">닉네임</label>
        <input id="profile-nickname" v-model="nickname" type="nickname" name="" :placeholder="me" required @invalid.prevent>
        <button type="submit">수정</button>
      </form>
      <div>
        <h3>팔로잉</h3>
        <FollowList :follow="state.followingList" :remove="removeFollowing" />
      </div>
      <div>
        <h3>팔로워</h3>
        <FollowList :follow="state.followerList" :remove="removeFollower" />
      </div>
    </div>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users'
import FollowList from '~/components/TheFollowList.vue';
definePageMeta({
  layout: 'admin',
});
export default {
  name: 'ProfileView',
  components: { FollowList },
  setup() {
    const usersStore = useUsersStore();
    const { state } = storeToRefs(usersStore);
    const { removeFollowing, removeFollower } = usersStore;
    const me = computed(() => state.value.me.nickname);
    const nickname = ref(me.value);
    // Nuxt function : <head></head> settings
    useHead({
      title: 'Profile pageee'
    });

    onMounted(() => {
      const { $trigger } = useNuxtApp();
      $trigger('endLoading');
    });

    const onChangeNickname = function () {
      try {
        usersStore.changeNickname({
          nickname: nickname.value
        });
      } catch (error) {
        console.log(error);
      }
    }

    return {
      state,
      me,
      nickname,
      onChangeNickname,
      removeFollowing,
      removeFollower
    }
  },
}
</script>
<style scoped>
  input:empty:invalid {
    background: pink;
  }
</style>