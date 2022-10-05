<template>
  <div>
    <ol>
      <li v-for="user in follow" :key="user.id">
        <span>{{ user.id }}</span>
        <i>{{ user.nickname }}</i>
        <button @click="remove(user)">삭제</button>
      </li>
    </ol>
  </div>
</template>
<script>
import { useUsersStore } from '~~/stores/users'
export default {
  name: 'TheFollowListComponent',
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
  props: {
    follow: {
      type: Array,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  setup() {
  },
}
</script>
