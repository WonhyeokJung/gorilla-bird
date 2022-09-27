<template>
  <div class="profile-card-container">
    <h2>{{ data }}</h2>
    <div class="wrapper">
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
      <div class="follow-container">
        <div>
          <h4>팔로잉</h4>
          <p>0명</p>
        </div>
        <div>
          <h4>팔로워</h4>
          <p>0명</p>
        </div>
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
<style scoped>
  .profile-card-container {
    text-align: center;

    margin: 20px 100px;
    border: 2px solid black;
    border-radius: 1rem;
    box-sizing: border-box;
    padding: 1.5rem 2.4rem;
  }

  .follow-container {
    display: flex;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 500px) {
    .profile-card-container {
      margin: 20px 30px;
    }
  }
</style>
