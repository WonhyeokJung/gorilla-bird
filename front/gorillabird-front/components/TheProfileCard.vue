<template>
  <div>
    {{ data }} page
    <div class="container">
      <h2>{{ data }} 프로필</h2>
      <form action="" method="post" class="login-form">
        <label for="nickname">닉네임</label>
        <input id="profile-nickname" type="nickname" name="" :placeholder="data" required>
        <button type="submit">수정</button>
      </form>
      <div>
        <h3>팔로잉</h3>
        <p>0명</p>
      </div>
      <div>
        <h3>팔로워</h3>
        <p>0명</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheProfileCard',
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
    const data = 'id';
    return {
      data
    }
  },
}
</script>
