<template>
  <div class="profile-card-container">
    <div class="profile-card-wrapper">
      <div class="profile-card-photo">
        <img src="" alt="" style="width: 150px; height: 150px; overflow:hidden; border: 2px solid black; border-radius: 9999px; ">
      </div>
      <div class="profile-card-info">
        <h1 class="profile-card-id">{{ usersStore.state.me.nickname }}</h1>
        <ul class="follow-container">
          <li>
            <button>0<span>following</span></button>
          </li>
          <li>
            <button>0<span>followers</span></button>
          </li>
        </ul>
        <div>
          <p class="profile-card-intro">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>
<script>
import { useUsersStore } from '~/stores/users';
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
    const usersStore = useUsersStore();
    console.log(usersStore)
    return {
      usersStore
    }
  },
}
</script>
<style scoped>
  .profile-card-container {
    margin: 20px 20px;
    
    /* padding: 1.5rem 2.4rem; */
  }
  .profile-card-wrapper {
    display: flex;
  }
  .profile-card-photo {
    width: 300px;
    flex-grow: 1;
  }
  .profile-card-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    flex-grow: 2;
  }

  .profile-card-id {
    margin-top: 0;
  }

  .follow-container {
    display: flex;
    flex-direction: row;
    margin-top: 0;
    padding: 0;
  }

  .follow-container * {
    /* margin-right: 40px; */
    font-size: 1.5rem;
  }

  li {
    display: list-item;
    list-style: none;
    margin-right: 20px;
  }
  button {
    margin: 0;
    border: 0;
    padding: 0;
    outline: none;
    background: none;
  }

  .profile-card-intro {
    margin-top: 0;
  }

  @media screen and (max-width: 500px) {
    .profile-card-container {
      margin: 20px 30px;
    }
  }
</style>
